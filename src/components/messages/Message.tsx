interface MessageProps {
  message: string;
}

export default function Message({ message }: MessageProps) {
  return (
    <div className="max-w-96 bg-gray-100 rounded-lg p-3 md:p-5">{message}</div>
  );
}
