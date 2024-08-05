import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessageOccupation,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldWrapper } from "./form-utils";
import SubmitButton from "@/components/button/submit-button";


const formSchema = z
  .object({
    username: z.string().min(1, {
      message: "Username is required",
    }),
    password: z.string().min(6, {
      message: "At least 6 characters long",
    }),
    confirm: z.string().min(6, {
      message: "At least 6 characters long",
    }),
    inviteCode: z.string().min(1, {
      message: "Invite code is required",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm: "",
      inviteCode: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
        className="flex flex-col items-center space-y-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FieldWrapper icon="username">
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
              </FieldWrapper>
              <FormMessageOccupation />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FieldWrapper icon="password">
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FieldWrapper>
              <FormMessageOccupation />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FieldWrapper icon="confirm">
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
              </FieldWrapper>
              <FormMessageOccupation />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inviteCode"
          render={({ field }) => (
            <FormItem>
              <FieldWrapper icon="inviteCode">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Invite code"
                    {...field}
                  />
                </FormControl>
              </FieldWrapper>
              <FormMessageOccupation />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
};
export default RegisterForm;
