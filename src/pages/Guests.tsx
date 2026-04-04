import { useState } from "react"
import { Search, Filter, Plus, MoreHorizontal, User, Mail, Phone, Globe, Star } from "lucide-react"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { DataTable } from "@/features/dashboard/components/DataTable"
import { Badge } from "@/features/dashboard/components/Badge"
import { guests } from "@/data/hotelData"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function Guests() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || guest.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      key: "name",
      header: "Guest",
      cell: (row: typeof guests[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[--color-bg-inset] flex items-center justify-center">
            <User className="w-5 h-5 text-[--color-text-sub]" />
          </div>
          <div>
            <div className="font-semibold flex items-center gap-2">
              {row.name}
              {row.status === "vip" && <Star className="w-4 h-4 text-[--color-gold-400] fill-[--color-gold-400]" />}
            </div>
            <div className="text-xs text-[--color-text-muted]">ID: {row.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      cell: (row: typeof guests[0]) => (
        <div className="text-sm">
          <div className="flex items-center gap-2 text-[--color-text-sub]">
            <Mail className="w-3 h-3" />
            {row.email}
          </div>
          <div className="flex items-center gap-2 text-[--color-text-muted]">
            <Phone className="w-3 h-3" />
            {row.phone}
          </div>
        </div>
      ),
    },
    {
      key: "country",
      header: "Country",
      cell: (row: typeof guests[0]) => (
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[--color-text-muted]" />
          {row.country}
        </div>
      ),
    },
    {
      key: "visits",
      header: "Visits",
      cell: (row: typeof guests[0]) => (
        <span className="font-medium">{row.visits}</span>
      ),
    },
    {
      key: "totalSpent",
      header: "Total Spent",
      cell: (row: typeof guests[0]) => (
        <span className="font-medium text-[--color-text-gold]">{formatCurrency(row.totalSpent)}</span>
      ),
    },
    {
      key: "lastVisit",
      header: "Last Visit",
      cell: (row: typeof guests[0]) => (
        <span className="text-[--color-text-sub]">{row.lastVisit}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: typeof guests[0]) => (
        <Badge variant={row.status === "vip" ? "gold" : "default"}>
          {row.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: () => (
        <button className="p-2 hover:bg-[--color-bg-subtle] rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-[--color-text-muted]" />
        </button>
      ),
      className: "w-10",
    },
  ]

  const vipGuests = guests.filter(g => g.status === "vip").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Guests</h1>
          <p className="text-[--color-text-sub]">Manage guest profiles and information</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Guest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Guests"
          value={guests.length}
          icon={<User className="w-5 h-5" />}
        />
        <StatCard
          title="VIP Guests"
          value={vipGuests}
          variant="gold"
          icon={<Star className="w-5 h-5" />}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(guests.reduce((sum, g) => sum + g.totalSpent, 0))}
          variant="success"
          icon={<User className="w-5 h-5" />}
        />
        <StatCard
          title="Avg. Spent"
          value={formatCurrency(Math.round(guests.reduce((sum, g) => sum + g.totalSpent, 0) / guests.length))}
          icon={<User className="w-5 h-5" />}
        />
      </div>

      <div className="card">
        <div className="p-4 border-b border-[--color-border] flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[--color-text-muted]" />
            <input
              type="text"
              placeholder="Search guests by name, email, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="all">All Status</option>
              <option value="vip">VIP</option>
              <option value="regular">Regular</option>
            </select>
            <button className="btn btn-ghost">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
        <DataTable
          data={filteredGuests}
          columns={columns}
          emptyMessage="No guests found"
        />
      </div>
    </div>
  )
}
