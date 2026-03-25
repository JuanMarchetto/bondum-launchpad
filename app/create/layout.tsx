import { AuthGuard } from "@/components/auth/auth-guard"
import { WhitelistGate } from "@/components/auth/whitelist-gate"

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <WhitelistGate>{children}</WhitelistGate>
    </AuthGuard>
  )
}
