import { readFileSync } from "fs";
import { join } from "path";
import { verifyPayment } from "./payment.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Order } from "../order/order.model";
import { Product } from "../product/product.model";

const confirmationService = async (transactionId: string, status: string) => {
  try {
    const verifyResponse = await verifyPayment(transactionId);

    let message = "";

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      const order = await Order.findOneAndUpdate(
        { transactionId },
        { paymentStatus: true, orderStatus: "completed", transactionId },
        { new: true }
      ).populate("Product");

      message = "Successfully Paid!";

      if (order) {
        // Reduce stock for each product in the order
        for (const item of order.products) {
          const updatedProduct = await Product.findByIdAndUpdate(
            item.product._id,
            { $inc: { stockQuantity: -item.quantity } },
            { new: true }
          );

          if (!updatedProduct || updatedProduct?.stockQuantity === 0) {
            await Product.findByIdAndUpdate(item.product._id, {
              $inc: { stockQuantity: item.quantity },
            });
            throw new AppError(
              httpStatus.CONFLICT,
              "Insufficient stock for product"
            );
          }
        }
      }
    } else {
      message = "Payment Failed!";
    }

    const filePath = join(__dirname, "../../../../public/conformation.html");
    let template = readFileSync(filePath, "utf-8");
    template = template
      .replace("{{message}}", message)
      .replace("{{status}}", status);
    return template;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "something went wrong");
  }
};

export const paymentServices = {
  confirmationService,
};
