import mongoose from 'mongoose';
import { OrderStatus } from '@palmpass/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAtttrs {
  userId: string;
  version: number;
  status: OrderStatus;
  id: string;
  price: number;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  version: number;
  status: OrderStatus;
  price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAtttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAtttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    userId: attrs.userId,
    price: attrs.price,
    status: attrs.status,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
