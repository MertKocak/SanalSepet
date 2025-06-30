/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react'
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import useAuthStore from '@/hooks/useAuth'
import registerUser from '@/actions/register'
import { startSession } from '@/lib/session'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { error } from 'console'
import { Loader2Icon } from 'lucide-react'

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Kullanıcı Adı 3 karakterden uzun olmalı!",
    }),
    email: z.string().min(2, {
        message: "E-Posta 2 karakterden uzun olmalı!",
    }),
    password: z.string().min(2, {
        message: "Şifre 6 karakterden uzun olmalı!",
    }),
})

const RegisterPage = () => {
    const { loader, setLoader } = useAuthStore();
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    /***
     * ff6700
     * 202020
     * D6D6D6
     * f8f9fa
     */


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setLoader(true);

        registerUser(data.username, data.email, data.password).then(
            (res) => {
                startSession(res.user, res.jwt);
                toast.success('Kullanıcı oluşturuldu!')
                setLoader(false)
                router.push("/")
            },
            (error) => {
                setLoader(false);
                toast.error('Bir hata oluştu!')
            }
        ).finally(
            () => setLoader(false)
        )

    }

    return (
        <div className='mt-4 border p-6 rounded-xl'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kullanıcı Adı</FormLabel>
                                <FormControl>
                                    <Input placeholder="Kullanıcı Adı" {...field} />
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
                                <FormLabel>E-Posta</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-Posta" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Şifre</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Şifre" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button style={{ backgroundColor: "#ff6700", width: "100%" }} className='cursor-pointer' type="submit">
                        {loader ? <Loader2Icon className='animate-spin' /> : "Kayıt Ol"}
                    </Button>
                </form>
            </Form>
            <div className='flex flex-row text-md mt-2 justify-center'>
                <div className='text-xs' style={{ color: "gray" }}>
                    Zaten bir hesabınız var mı?
                    <Link style={{ color: "#ff6700", }} className='ml-1 font-bold' href={"/login"}>
                        Giriş Yapın!
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage