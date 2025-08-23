import Link from "next/link";

type Props = {
  message: string;
  code: number;
  goBackLink: string;
  goBackLinkText: string;
};

export default function PageError({
  message,
  code,
  goBackLink,
  goBackLinkText,
}: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>
        <p className="">{message}</p>
        <p className="text-center">
          Go back to{" "}
          <Link href={goBackLink} className="is-link-primary">
            {goBackLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}
