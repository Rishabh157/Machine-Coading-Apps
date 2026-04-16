import { useEffect, useState } from "react";

interface ProductItem {
  id: number;
  productName: string;
  address: string;
  price: number;
  discount: number;
  action: string;
}

const tableRowsData: ProductItem[] = [
  {
    id: 1,
    productName: "Apple iPhone 15 Pro",
    address: "Titanium Blue, 256GB Storage",
    price: 129900,
    discount: 5000,
    action: "Go To Product",
  },
  {
    id: 2,
    productName: "Sony WH-1000XM5",
    address: "Wireless Noise Cancelling Headphones",
    price: 24990,
    discount: 5000,
    action: "Go To Product",
  },
  {
    id: 3,
    productName: "MacBook Air M2",
    address: "Midnight, 13.6-inch Liquid Retina",
    price: 99900,
    discount: 15000,
    action: "Go To Product",
  },
  {
    id: 4,
    productName: "Samsung Galaxy Watch 6",
    address: "Graphite, 44mm Bluetooth",
    price: 32999,
    discount: 3000,
    action: "Go To Product",
  },
  {
    id: 5,
    productName: "Dell XPS 13 Laptop",
    address: "Platinum Silver, Intel i7, 16GB",
    price: 145000,
    discount: 10000,
    action: "Go To Product",
  },
  {
    id: 6,
    productName: "Logitech MX Master 3S",
    address: "Performance Wireless Mouse",
    price: 9450,
    discount: 1000,
    action: "Go To Product",
  },
];

const Product = () => {
  const [allProducts, setAllProducts] = useState<ProductItem[]>(tableRowsData);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductItem[]>(tableRowsData);

  // Filter states
  const [priceFilter, setPriceFilter] = useState<number | "">("");
  const [nameFilter, setNameFilter] = useState<string>("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    productName: "",
    address: "",
    price: 0,
    discount: 0,
    action: "Go To Product",
  });

  // Apply filters whenever allProducts, priceFilter, or nameFilter changes
  useEffect(() => {
    let result = allProducts;

    if (nameFilter) {
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(nameFilter.toLowerCase()),
      );
    }

    if (priceFilter !== "") {
      result = result.filter((p) => p.price >= (priceFilter as number));
    }

    setFilteredProducts(result);
  }, [allProducts, priceFilter, nameFilter]);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      productName: "",
      address: "",
      price: 0,
      discount: 0,
      action: "Go To Product",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: ProductItem) => {
    setEditingId(product.id);
    setFormData({
      productName: product.productName,
      address: product.address,
      price: product.price,
      discount: product.discount || 0,
      action: product.action,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setAllProducts(allProducts.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setAllProducts(
        allProducts.map((p) =>
          p.id === editingId ? { ...p, ...formData } : p,
        ),
      );
    } else {
      const newId =
        allProducts.length > 0
          ? Math.max(...allProducts.map((p) => p.id)) + 1
          : 1;
      setAllProducts([...allProducts, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="bg-[#f7f8fa] ml-60 p-4 min-h-screen">
        <h1 className="text-xl font-bold mb-8"> Product </h1>

        <div className="grid grid-cols-12 gap-4">
          <div className="flex gap-x-2 col-span-10">
            <button className="border border-slate-300 px-4 py-1 rounded bg-white text-sm hover:bg-gray-100">
              Filter
            </button>

            <button className="border border-slate-300 px-4 py-1 rounded bg-white text-sm hover:bg-gray-100">
              Date
            </button>

            <button className="border border-slate-300 px-4 py-1 rounded bg-white text-sm hover:bg-gray-100">
              Time
            </button>

            <input
              type="text"
              placeholder="Product"
              className="border  placeholder:text-black border-slate-300 px-2 py-1 rounded bg-white text-sm"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />

            <input
              type="number"
              onChange={(e) =>
                setPriceFilter(
                  e.target.value === "" ? "" : parseInt(e.target.value),
                )
              }
              value={priceFilter}
              className="border placeholder:text-black border-slate-300 w-[15%] text-start py-0.5 px-2 rounded bg-white text-sm"
              placeholder="Min Price"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              onClick={handleOpenAddModal}
              className="border bg-[#4a7fff] border-slate-300 text-center py-1 px-4 rounded text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              + Add Product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 justify-between items-center mt-6">
          <div className="col-span-4">
            <h2 className="text-xl font-semibold">Latest Products</h2>
          </div>

          <div className="col-span-8 flex gap-x-4 justify-end">
            <button className="border border-slate-300 text-start py-1 px-4 text-sm rounded bg-white">
              Select Store
            </button>
            <button className="border border-slate-300 text-start py-1 px-4 text-sm rounded bg-white">
              {new Date().toLocaleDateString()}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="mt-5 w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="text-sm bg-white hover:bg-slate-50 border-b transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-gray-600">
                    #{product.id}
                  </td>
                  <td className="py-4 px-4">{product.productName}</td>
                  <td className="py-4 px-4 text-gray-500">{product.address}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-600">
                          ₹{product.price}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-gray-400 line-through text-xs">
                            ₹{product.price + product.discount}
                          </span>
                        )}
                      </div>
                      {product.discount > 0 && (
                        <span className="text-green-500 text-[10px] font-medium">
                          Saved ₹{product.discount}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{product.action}</td>
                  <td className="py-4 px-4 text-right space-x-3">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="text-blue-500 hover:text-blue-700 font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:text-red-600 cursor-pointer text-lg"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.productName}
                  onChange={(e) =>
                    setFormData({ ...formData, productName: e.target.value })
                  }
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address / Description
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter address or description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (&#x20B9;)
                  </label>
                  <input
                    required
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Amount (&#x20B9;)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-red-500 bg-red-50/30"
                    placeholder="0"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Action Text
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={formData.action}
                    onChange={(e) =>
                      setFormData({ ...formData, action: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  {editingId ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
