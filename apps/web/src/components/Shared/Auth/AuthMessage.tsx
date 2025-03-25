import { H4 } from "@hey/ui";

interface AuthMessageProps {
  description: string;
  title: string;
}

const AuthMessage = ({ description, title }: AuthMessageProps) => (
  <div className="space-y-2">
    <H4>{title}</H4>
    <div className="ld-text-gray-500 text-sm">{description}</div>
  </div>
);

export default AuthMessage;
