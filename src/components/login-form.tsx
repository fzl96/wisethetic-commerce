"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
//
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [termsDialog, setTermsDialog] = useState(false);
  const [policyDialog, setPolicyDialog] = useState(false);

  const signInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={signInWithGoogle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => setTermsDialog(true)}
        >
          Terms of Service
        </span>{" "}
        and{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => setPolicyDialog(true)}
        >
          Privacy Policy
        </span>{" "}
      </div>
      <Dialog open={termsDialog} onOpenChange={setTermsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terms of Service (Syarat & Ketentuan)</DialogTitle>
            <DialogDescription className="text-base">
              <p className="">
                Dengan membuat akun atau masuk ke aplikasi ini, Anda menyetujui
                hal-hal berikut:
              </p>

              <ul className="list-disc list-inside space-y-2 ">
                <li>
                  Anda memberikan informasi yang benar, lengkap, dan dapat
                  dipertanggungjawabkan saat melakukan pendaftaran.
                </li>
                <li>
                  Anda bertanggung jawab menjaga keamanan akun Anda, termasuk
                  email dan kata sandi.
                </li>
                <li>
                  Anda memahami bahwa aplikasi ini adalah platform penghubung
                  antara studio foto dan pengguna.
                </li>
                <li>
                  Setiap transaksi, pemesanan, dan perubahan jadwal mengikuti
                  kebijakan masing-masing studio.
                </li>
                <li>
                  Anda dilarang melakukan tindakan yang merugikan studio,
                  pengguna lain, atau sistem (penipuan, penyalahgunaan, akses
                  ilegal, dan sejenisnya).
                </li>
                <li>
                  Kami berhak membatasi, menangguhkan, atau menghapus akun jika
                  terjadi pelanggaran terhadap ketentuan.
                </li>
                <li>
                  Fitur dan layanan platform dapat berubah sewaktu-waktu untuk
                  meningkatkan kualitas layanan.
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={policyDialog} onOpenChange={setPolicyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Privacy Policy (Kebijakan Privasi)</DialogTitle>
            <DialogDescription className="text-base">
              <p className="">
                Dengan menggunakan aplikasi ini, Anda menyetujui cara kami
                mengumpulkan dan memproses data pribadi Anda:
              </p>

              <ul className="list-disc list-inside space-y-2 ">
                <li>
                  <span className="font-semibold ">Data yang dikumpulkan:</span>{" "}
                  nama, email, nomor telepon (opsional), informasi profil, dan
                  aktivitas pemesanan.
                </li>

                <li>
                  <span className="font-semibold ">
                    Tujuan penggunaan data:
                  </span>
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Mengelola akun dan otentikasi pengguna</li>
                    <li>Memproses pemesanan studio</li>
                    <li>Menghubungkan Anda dengan studio yang Anda pilih</li>
                    <li>
                      Meningkatkan kualitas layanan dan pengalaman pengguna
                    </li>
                  </ul>
                </li>

                <li>
                  <span className="font-semibold ">Perlindungan data:</span>{" "}
                  Kami menjaga keamanan data Anda dan tidak membagikannya kepada
                  pihak ketiga kecuali:
                  <ul className="list-disc ml-5 space-y-1">
                    <li>Studio yang Anda pesan</li>
                    <li>Pihak yang diwajibkan oleh hukum</li>
                  </ul>
                </li>

                <li>
                  <span className="font-semibold ">Hak pengguna:</span> Anda
                  dapat mengubah atau menghapus data akun kapan pun melalui
                  halaman profil (kecuali data yang harus disimpan untuk
                  keperluan transaksi).
                </li>

                <li>
                  Cookie &amp; pelacakan:
                  <span className="font-semibold "></span> Aplikasi dapat
                  menggunakan cookie atau teknologi serupa untuk keperluan
                  login, keamanan, dan peningkatan pengalaman.
                </li>

                <li>
                  <span className="font-semibold ">Perubahan kebijakan:</span>{" "}
                  Kebijakan privasi dapat diperbarui dari waktu ke waktu dan
                  perubahan akan diumumkan di dalam aplikasi.
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
