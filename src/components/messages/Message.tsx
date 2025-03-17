import { Fragment } from "react";

interface MessageProps {
  message: string;
}

export default function Message({ message }: MessageProps) {
  return (
    <Fragment>
      <div className="w-fit h-fit max-w-96 bg-gray-100 rounded-lg p-3 md:p-5">
        {message}
      </div>
    </Fragment>
  );
}
