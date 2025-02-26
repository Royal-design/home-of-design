import { auth, db, storage } from "@/firebase/firebaseConfig";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from "firebase/storage";
import { useAppSelector } from "@/redux/store";
import { UserType } from "@/redux/slice/authSlice";

const EditProfileSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  description: z
    .string()
    .min(3, { message: "Must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  photo: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Please upload a valid photo"
    })
    .optional()
});

export const EditProfilepage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const oldPhoto = user?.photo;

  type EditProfileFormData = z.infer<typeof EditProfileSchema>;

  // Initialize the form with react-hook-form and use the zodResolver
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      description: user?.description || "",
      photo: undefined
    }
  });
  // Handle form submission
  const onSubmit: SubmitHandler<EditProfileFormData> = async (data) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        const userDoc = (await getDoc(docRef)).data() as UserType;
        console.log(userDoc);

        // delete old photo if it exists
        if (userDoc.photoPath) {
          const photoRef = ref(storage, userDoc.photoPath);
          await deleteObject(photoRef);
        }

        // upload new photo if exists
        let photo = userDoc.photo;
        let photoPath = userDoc.photoPath;

        if (data.photo) {
          const imageFile = data.photo;
          photoPath = `userphotos/${uuidv4()}.jpg`;
          const photoRef = ref(storage, photoPath);
          await uploadBytes(photoRef, imageFile);
          photo = await getDownloadURL(photoRef);
        }

        await updateDoc(docRef, {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          description: data.description,
          photo,
          photoPath,
          updatedAt: serverTimestamp()
        });
        toast.success("Profile updated successfully!");
        navigate("/profile");
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("photo", file);
    }
  };
  return (
    <div className=" bg-background text-primary flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className=" bg-background text-primary w-[25rem] ">
            <CardHeader className="flex items-center justify-center">
              <CardTitle className="text-2xl text-center">
                Edit Profile{" "}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:border-green-400 focus:border-1 border-primary duration-150"
                        placeholder="Enter your firstname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:border-green-400 focus:border-1 border-primary duration-150"
                        placeholder="Enter your lastname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({}) => (
                  <FormItem>
                    <FormLabel className="require">
                      Upload Profile Image
                    </FormLabel>

                    <Input
                      id="photo"
                      type="file"
                      onChange={handleFileChange}
                      required
                    />
                    {oldPhoto && preview === null && (
                      <img
                        src={oldPhoto}
                        className="h-32 w-32 rounded-full mt-2"
                      />
                    )}
                    {preview && (
                      <img
                        src={preview}
                        className="h-32 w-32 rounded-full mt-2"
                      />
                    )}
                    {form.formState.errors.photo && (
                      <span className="text-red-500">
                        {form.formState.errors.photo.message}
                      </span>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Description</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:border-green-400 focus:border-1 border-primary duration-150"
                        placeholder="your description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="focus:border-green-400 focus:border-1 border-primary duration-150"
                        placeholder="Enter a valid email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full text-white dark:text-primary bg-slate-600 hover:bg-slate-700 duration-200 hover:outline-green-500 hover:outline-1 outline outline-1"
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
