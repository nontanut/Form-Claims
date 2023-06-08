import { z } from "zod";

export const formSchema = z.object({
  applicationId: z.number(),
  document: z.object({
    username: z.string(),
    password: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
    brandImei: z.string(),
    imei: z.string(),
    accessories: z.array(z.string()),
    adapter: z.string(),
    more: z.string(),
    failure: z.array(z.string()),
    accident: z.string(),
    moreAccident: z.string(),
    deductible: z.string(),
    paymentBill: z.string(),
    branches: z.string(),
    province: z.string(),
    brand: z.string(),
    model: z.string(),
  }),
  isClosed: z.boolean(),
  lossAmount: z.string(),
  memo: z.string(),
});
