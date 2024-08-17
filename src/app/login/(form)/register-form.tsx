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
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    qqNumber: z.string().min(1, {
      message: "Username is required",
    }),
    password: z.string().min(6, {
      message: "At least 6 characters long",
    }),
    confirm: z.string().min(6, {
      message: "At least 6 characters long",
    }),
    inviteCode: z
      .string()
      .min(1, {
        message: "Invite code is required",
      })
      .uuid({
        message: "Invalid invite code",
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match",
    path: ["confirm"],
  });

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qqNumber: "",
      password: "",
      confirm: "",
      inviteCode: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qqNumber: formData.qqNumber,
        password: formData.password,
        inviteCode: formData.inviteCode,
      }),
    }).then((data) => data.json());

    if (res.message === "ok") {
      router.push("/");
      return;
    }

    form.setError("inviteCode", {
      type: "manual",
      message: res.message,
    });
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-2"
      >
        <FormField
          control={form.control}
          name="qqNumber"
          render={({ field }) => (
            <FormItem>
              <FieldWrapper icon="qqNumber">
                <FormControl>
                  <Input placeholder="QQ Number" {...field} />
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
                  <Input type="text" placeholder="Invite code" {...field} />
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
