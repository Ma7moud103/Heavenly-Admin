import { type FormEvent, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react"
import { SharedInput } from "@/components/shared/SharedInput"
import type { IForm } from "@/interfaces/IRegesterForm"
import signup from "@/data/auth/register"

const ROLE_OPTIONS = [
  { value: "staff", label: "Staff", icon: Users, color: "emerald" },
  { value: "admin", label: "Admin", icon: ShieldCheck, color: "sky" },
  { value: "super_admin", label: "Super Admin", icon: Sparkles, color: "amber" },
] as const

const COUNTRY_OPTIONS = ["Egypt", "Saudi Arabia", "United Arab Emirates", "United States", "United Kingdom"]

const STEPS = [
  { id: 1, label: "Profile", icon: UserRound },
  { id: 2, label: "Access", icon: ShieldCheck },
  { id: 3, label: "Review", icon: Check },
] as const



export default function Register() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<IForm>({
    full_name: "",
    phone: "",
    avatar_url: "",
    role_name: "staff",
    is_active: true,
    email: "",
    password: "",
    confirm_password: "",
    country: "Egypt",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const selectedRole = ROLE_OPTIONS.find((role) => role.value === form.role_name) ?? ROLE_OPTIONS[0]
  const approvalText = form.role_name === "super_admin" ? "Direct platform approval" : "Needs super admin confirmation"

  const completion = useMemo(() => {
    const values = [
      form.full_name,
      form.phone,
      form.email,
      form.password,
      form.country,
      form.role_name,
    ]

    return Math.round((values.filter(Boolean).length / values.length) * 100)
  }, [form])

  const handleChange = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const nextStep = () => setStep((current) => Math.min(current + 1, STEPS.length))
  const prevStep = () => setStep((current) => Math.max(current - 1, 1))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try {
      const result = await signup(form)
      
      if (result.success) {
        toast.success("Account created successfully!")
        // Add navigation here if needed: navigate("/dashboard")
      } else {
        toast.error(result.error || "Registration failed")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error(error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-400/5 via-transparent to-amber-400/5 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-6">
            <ShieldCheck className="h-4 w-4" />
            Heavenly Admin
          </div>
          <h1 className="font-[var(--font-heading)] text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            Create new account
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Complete the multi-step registration to add administrators, staff, and team members to your hotel management system.
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-600">Registration progress</span>
            <span className="text-sm font-bold text-slate-900">{completion}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-400 transition-all duration-700 ease-out"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {STEPS.map((item, index) => {
            const isCurrent = item.id === step
            const isDone = item.id < step
            const Icon = item.icon

            return (
              <div key={item.id} className="flex items-center">
                <div
                  className={`flex bg-red-50 p-2 items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                    isCurrent
                      ? "bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 shadow-lg shadow-sky-100"
                      : isDone
                        ? "bg-emerald-50 border border-emerald-200"
                        : "bg-white border border-slate-200"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                      isDone
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200"
                        : isCurrent
                          ? "bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-200"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-sm font-semibold ${isCurrent || isDone ? "text-slate-900" : "text-slate-500"}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-500">Step {item.id}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 rounded-full ${item.id < step ? "bg-emerald-500" : "bg-slate-200"}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Main form card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-400" />

            <div className="p-8 sm:p-10">
              <div className="mb-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-1">
                      Step {step} of {STEPS.length}
                    </p>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                      {step === 1 && "Profile Information"}
                      {step === 2 && "Access & Security"}
                      {step === 3 && "Review & Confirm"}
                    </h2>
                    <p className="text-slate-600 max-w-xl">
                      {step === 1 && "Enter the basic profile details for the new team member."}
                      {step === 2 && "Configure account permissions, role, and security settings."}
                      {step === 3 && "Verify all information before creating the account."}
                    </p>
                  </div>

                  {/* Live preview card */}
                  <div className="hidden lg:flex flex-col items-center">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl">
                      {form.avatar_url ? (
                        <img
                          src={form.avatar_url}
                          alt={form.full_name || "Avatar preview"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound className="h-10 w-10 text-slate-400" />
                      )}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-900">{form.full_name || "Profile Preview"}</p>
                    <p className="text-xs text-slate-500">{selectedRole.label}</p>
                  </div>
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <SharedInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={form.full_name}
                        onChange={(event) => handleChange("full_name", event.target.value)}
                        labelClassName="text-slate-700"
                        className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
                      />
                      <SharedInput
                        label="Phone Number"
                        type="tel"
                        placeholder="+20 100 000 0000"
                        value={form.phone}
                        onChange={(event) => handleChange("phone", event.target.value)}
                        labelClassName="text-slate-700"
                        className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <SharedInput
                        label="Email Address"
                        type="email"
                        placeholder="name@heavenlyhotel.com"
                        value={form.email}
                        onChange={(event) => handleChange("email", event.target.value)}
                        labelClassName="text-slate-700"
                        className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
                      />
                      <SharedInput
                        label="Country"
                        placeholder="Select country"
                        list="register-country-options"
                        value={form.country}
                        onChange={(event) => handleChange("country", event.target.value)}
                        labelClassName="text-slate-700"
                        className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
                      />
                      <datalist id="register-country-options">
                        {COUNTRY_OPTIONS.map((country) => (
                          <option key={country} value={country} />
                        ))}
                      </datalist>
                    </div>

                    <SharedInput
                      label="Avatar URL (Optional)"
                      type="url"
                      placeholder="https://cdn.example.com/avatar.jpg"
                      value={form.avatar_url}
                      onChange={(event) => handleChange("avatar_url", event.target.value)}
                      labelClassName="text-slate-700"
                      className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
                      hint="Provide a direct image URL for the profile picture."
                      hintClassName="text-slate-500"
                    />

                    <div className="grid gap-4 sm:grid-cols-3 mt-8">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-sky-200 transition-colors">
                        <div className="h-10 w-10 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
                          <Mail className="h-5 w-5 text-sky-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">Email Identity</p>
                        <p className="text-xs text-slate-600">Primary contact for system notifications and account recovery.</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-amber-200 transition-colors">
                        <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                          <Phone className="h-5 w-5 text-amber-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">Direct Contact</p>
                        <p className="text-xs text-slate-600">For internal communication and emergency staff coordination.</p>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-200 transition-colors">
                        <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                          <MapPin className="h-5 w-5 text-emerald-600" />
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">Location Data</p>
                        <p className="text-xs text-slate-600">Timezone and regional settings for the user interface.</p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-4 block">Account Role</label>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {ROLE_OPTIONS.map((role) => {
                          const isSelected = form.role_name === role.value
                          const Icon = role.icon

                          return (
                            <button
                              key={role.value}
                              type="button"
                              onClick={() => handleChange("role_name", role.value)}
                              className={`relative rounded-2xl border p-5 text-left transition-all duration-300 ${
                                isSelected
                                  ? `border-${role.color}-300 bg-${role.color}-50 shadow-lg shadow-${role.color}-100`
                                  : "border-slate-200 bg-white hover:border-slate-300"
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              )}
                              <div className={`h-12 w-12 rounded-xl bg-${role.color}-100 flex items-center justify-center mb-4`}>
                                <Icon className={`h-6 w-6 text-${role.color}-600`} />
                              </div>
                              <p className="text-lg font-bold text-slate-900 mb-1">{role.label}</p>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {role.value === "super_admin"
                                  ? "Full system access with unlimited permissions."
                                  : role.value === "admin"
                                    ? "Manage staff, bookings, and hotel operations."
                                    : "Front desk operations and guest management."}
                              </p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 mt-8">
                      <div className="relative">
                        <SharedInput
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={form.password}
                          onChange={(event) => handleChange("password", event.target.value)}
                          labelClassName="text-slate-700"
                          className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <div className="relative">
                        <SharedInput
                          label="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={form.confirm_password}
                          onChange={(event) => handleChange("confirm_password", event.target.value)}
                          labelClassName="text-slate-700"
                          className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <label className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 cursor-pointer hover:border-slate-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={form.is_active}
                        onChange={(event) => handleChange("is_active", event.target.checked)}
                        className="mt-0.5 h-5 w-5 rounded border-slate-300 bg-white text-sky-500 focus:ring-sky-500/20"
                      />
                      <div>
                        <span className="block font-semibold text-slate-900">Activate account immediately</span>
                        <span className="text-sm text-slate-600">
                          When enabled, the account will be active upon creation. Disable to create as draft.
                        </span>
                      </div>
                    </label>

                    <div className="rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-cyan-50 p-6 mt-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">
                          <ShieldCheck className="h-6 w-6 text-sky-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Current Role: {selectedRole.label}</p>
                          <p className="text-sm text-slate-600">{approvalText}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <div className="flex items-center gap-6">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
                          {form.avatar_url ? (
                            <img
                              src={form.avatar_url}
                              alt={form.full_name || "Avatar preview"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Camera className="h-10 w-10 text-slate-400" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-2xl font-bold text-slate-900">
                            {form.full_name || "Unnamed profile"}
                          </p>
                          <p className="text-slate-600">{form.email || "No email provided"}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="inline-flex rounded-full bg-sky-100 border border-sky-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                              {selectedRole.label}
                            </span>
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${form.is_active ? 'bg-emerald-100 border border-emerald-200 text-emerald-600' : 'bg-slate-100 border border-slate-200 text-slate-600'}`}>
                              {form.is_active ? 'Active' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <ReviewItem label="Full Name" value={form.full_name} />
                      <ReviewItem label="Phone Number" value={form.phone} />
                      <ReviewItem label="Email Address" value={form.email} />
                      <ReviewItem label="Country" value={form.country} />
                      <ReviewItem label="Account Role" value={selectedRole.label} />
                      <ReviewItem label="Account Status" value={form.is_active ? "Active" : "Draft"} />
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-6 w-6 text-emerald-600" />
                        <div>
                          <p className="font-bold text-slate-900">Ready to create account</p>
                          <p className="text-sm text-slate-600">
                            All required fields have been completed. Click Create Account to finalize registration.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="px-6 h-12 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold transition-all hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Previous Step
                  </button>

                  <div className="flex gap-4">
                    <Link
                      to="/"
                      className="px-6 h-12 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold transition-all hover:bg-slate-50 flex items-center justify-center"
                    >
                      Cancel
                    </Link>
                    {step < STEPS.length ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-8 h-12 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all flex items-center justify-center gap-2"
                      >
                        Continue
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-8 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all flex items-center justify-center gap-2"
                      >
                        <Check className="h-5 w-5" />
                        Create Account
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-600 hover:text-sky-700 font-medium transition-colors">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">{label}</p>
      <p className="text-sm font-medium text-slate-900">{value || "Not provided"}</p>
    </div>
  )
}
