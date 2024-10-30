import { DashboardLayout } from "#components/layout/DashboardLayout"
export default function Layout(props: { children: React.ReactNode }) {
  return <DashboardLayout>{props.children}</DashboardLayout>
}
