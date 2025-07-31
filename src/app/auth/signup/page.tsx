import SignUpForm from "./form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 px-4">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  )
}
