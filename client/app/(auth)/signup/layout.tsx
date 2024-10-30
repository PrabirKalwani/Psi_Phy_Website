import { SignUpAuthLayout } from "#components/layout/SignUpAuthLayout"
export default function Layout(props: { children: React.ReactNode }) {
  return <SignUpAuthLayout>{props.children}</SignUpAuthLayout>
}
