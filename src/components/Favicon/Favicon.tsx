import Image from 'next/image';

type FaviconProps = {
  url: string;
  size?: number;
};

export default function Favicon({ url, size = 32 }: FaviconProps) {
  return (
    <Image
      height={size}
      width={size}
      src={`http://www.google.com/s2/favicons?sz=32&domain=${url}`}
      alt=""
    />
  );
}