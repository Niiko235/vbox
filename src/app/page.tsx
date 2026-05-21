import { AuthCardDesktop } from "@/features/auth/components/auth-card-desktop";
import { getUniversidades } from "@/features/auth/actions/get-universidades";
import { getProgramas } from "@/features/auth/actions/get-programas";

export default async function Home() {
  const [uniRes, progRes] = await Promise.all([
    getUniversidades(),
    getProgramas(),
  ]);

  return (
    <main className="min-h-screen w-screen flex items-center justify-center">
      <AuthCardDesktop
        universidades={uniRes.data}
        programas={progRes.data}
      />
    </main>
  )
}


//  bg-gradient-to-t from-[#2D086E] to-black
