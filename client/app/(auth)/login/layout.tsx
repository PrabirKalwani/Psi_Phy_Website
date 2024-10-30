import { LoginAuthLayout } from "#components/layout/LoginAuthLayout"

export default function Layout(props: { children: React.ReactNode }) {
  return <LoginAuthLayout>{props.children}</LoginAuthLayout>
}
