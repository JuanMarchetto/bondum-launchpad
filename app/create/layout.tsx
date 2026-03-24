import { AuthGuard } from "@/components/auth/auth-guard"

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
