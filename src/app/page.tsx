import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          Double-Border Table Example
        </h1>
        <table className="w-full border-collapse border-4 border-gray-800">
          <thead>
            <tr>
              <th className="border-2 border-gray-800 px-4 py-2 text-left bg-gray-200">
                Question
              </th>
              <th className="border-2 border-gray-800 px-4 py-2 text-left bg-gray-200">
                True
              </th>
              <th className="border-2 border-gray-800 px-4 py-2 text-left bg-gray-200">
                False
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Question Row 1 */}
            <tr>
              <td className="border-2 border-gray-800 px-4 py-2">
                &lt;bgsound&gt; audio tag is supported only by Internet
                Explorer.
              </td>
              <td className="border-2 border-gray-800 text-center">
                <input type="radio" name="q1" />
              </td>
              <td className="border-2 border-gray-800 text-center">
                <input type="radio" name="q1" />
              </td>
            </tr>

            {/* Question Row 2 */}
            <tr>
              <td className="border-2 border-gray-800 px-4 py-2">
                .NET Framework provides tools to build network applications.
              </td>
              <td className="border-2 border-gray-800 text-center">
                <input type="radio" name="q2" />
              </td>
              <td className="border-2 border-gray-800 text-center">
                <input type="radio" name="q2" />
              </td>
            </tr>

            {/* Question Row 3 */}
            <tr>
              <td className="border-2 border-gray-800 px-4 py-2">
                To display a circle, coordinates and radius are required.
              </td>
              <td className="border-2 border-gray-800 text-center">
                <input type="radio" name="q3" />
              </td>
              <td className="border-2 border-gray-800 text-center">
                <input type="radio" name="q3" />
              </td>
            </tr>

            {/* Question Row 4 */}
            <tr>
              <td className="border-2 border-gray-800 px-4 py-2">
                In DBMS, searching a particular record is possible.
              </td>
              <td className="border-2 border-gray-800 text-center">
                <input type="radio" name="q4" />
              </td>
              <td className="border-2 border-gray-800 text-center">
                <input type="radio" name="q4" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
