import React from "react";

const Billing = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">
            Third Party Administration Pvt.ltd.
          </h2>
          <p>Bakshi ka Talab Lucknow</p>
          <p>+91 5678987654</p>
        </div>
        <div className="text-right">
          <h4 className="text-lg font-bold uppercase">Commercial Invoice</h4>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-6">
        <h5 className="font-bold">Bill To:</h5>
        <p>Balchandra</p>
        <p>Sudhiyani</p>
        <p>+91 7040182023</p>
      </div>

      {/* Invoice Details */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Disease Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Cost</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">12/12</td>
              <td className="border p-2">Cancer</td>
              <td className="border p-2">Anthit</td>
              <td className="border p-2">Blood Cancer</td>
              <td className="border p-2">345678</td>
              <td className="border p-2">10%</td>
              <td className="border p-2">4</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-6">
        <div className="text-gray-600">
          Total due in 10 days. Overdue accounts may incur additional fees.
        </div>
        <div className="text-right">
          <p>
            <strong>Subtotal:</strong> 377
          </p>
          <p>
            <strong>Tax:</strong> 74747
          </p>
          <p>
            <strong>Shipping:</strong> 56789
          </p>
          <p className="font-bold">
            <strong>Total:</strong> 456789
          </p>
        </div>
      </div>
    </div>
  );
};

export default Billing;
