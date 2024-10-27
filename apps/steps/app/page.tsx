import Link from 'next/link';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      <h1 className="text-2xl font-bold">Hello, 丽暖！</h1>
      <ul className="flex flex-col gap-4">
        <li className="text-lg">
          <Link href="/little-note">小纸条打印机</Link>
        </li>
        <li className="text-lg">
          <Link href="/report">成绩报告(未完成)</Link>
        </li>
        <li className="text-lg">
          <Link href="/admin">上传成绩(未完成)</Link>
        </li>
      </ul>
    </div>
  );
}
