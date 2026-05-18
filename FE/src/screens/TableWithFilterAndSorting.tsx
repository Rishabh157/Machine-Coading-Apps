import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { ModalWithESCClose } from "./ModalWithClose";
import { createPortal } from "react-dom";

const API_URL = "https://dummyjson.com/products";

type ProductListTypesResponse = {
  id: 1;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];

  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

type FilterTyeps = {
  label: string;
  key: string;
  count: number;
  checked: boolean;
};

export default function TableWithFilterAndSorting() {
  const [products, setProducts] = useState<ProductListTypesResponse[]>([]);

  const [search, setSearch] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);

  const [autoSearchText, setAutoSearchText] = useState<string[]>([]);

  const [sorted, setSorted] = useState({
    id: false,
  });

  async function getProducts(limit: number, page: number) {
    let skip = (page - 1) * limit;

    const products = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
    const data = await products.json();

    setProducts(data?.products);
    setTotalItems(data?.total);
  }

  useEffect(() => {
    getProducts(limit, page);
  }, [limit, page]);

  // sorting
  useEffect(() => {
    if (sorted.id) {
      setProducts((prev) => [...prev]?.sort((a, b) => b.id - a.id));
    } else {
      setProducts((prev) => [...prev]?.sort((a, b) => a.id - b.id));
    }
  }, [limit, page, sorted.id]);

  return (
    <div>
      <h1 className="text-center text-lg mt-4">
        Build a Table with Sorting and Filtering and Pagination Component
      </h1>

      <div className="flex justify-center ">
        <Filter filters={[]} />
        <div>
          <Pagination
            autoSearchOptions={autoSearchText}
            search={search}
            onSetSearch={(value) => {
              setSearch(value);

              if (value?.length > 2) {
                setAutoSearchText(
                  products
                    ?.filter((ele: ProductListTypesResponse) =>
                      ele.title?.toLowerCase().includes(value),
                    )
                    ?.map((ele) => ele.title),
                );
              }
            }}
            totalItems={totalItems}
            limit={limit}
            page={page}
            onSetPage={(page) => setPage(page)}
            onChangeLimit={(limit) => setLimit(limit)}
          />
          <Table
            search={search}
            data={products}
            sorted={sorted}
            setSorted={() => setSorted((prev) => ({ ...prev, id: !prev.id }))}
          />
        </div>
      </div>
    </div>
  );
}

function Table({
  search,
  sorted,
  setSorted,
  data,
}: {
  search: string;
  sorted: { id: boolean };
  setSorted: () => void;
  data: ProductListTypesResponse[];
}) {
  const [openImageId, setOpenImageId] = useState<number | null>(null);
  return (
    <div>
      {openImageId &&
        createPortal(
          <ModalWithESCClose
            children={
              <div className="w-full h-full">
                <img
                  src={data?.find((ele) => ele.id === openImageId)?.images[0]}
                  alt={data?.find((ele) => ele.id === openImageId)?.title}
                  className="border border-slate-300"
                />
              </div>
            }
            onClose={() => setOpenImageId(null)}
          />,
          document.body,
        )}
      <table className="min-w-full mb-10 border border-gray-200 sticky top-0 rounded-lg shadow-sm">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="group flex items-center gap-x-2 px-4 py-2 text-left text-sm font-semibold text-gray-600">
              ID
              <FaArrowDown
                onClick={setSorted}
                className={`${sorted.id && "rotate-180"} invisible cursor-pointer transition-all group-hover:visible`}
              />
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Price $
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Category
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Brand
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              Rating
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              IMG
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 overflow-scroll">
          {data
            ?.filter(
              (ele) =>
                ele?.title.toLowerCase().includes(search.toLowerCase()) && ele,
            )
            ?.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product?.id}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product?.title}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product?.price}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product?.category}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product?.brand}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {product?.rating}
                </td>
                <td
                  onClick={() => setOpenImageId(product?.id)}
                  className="px-4 py-2 cursor-pointer text-sm text-gray-700 truncate max-w-xs"
                >
                  <img
                    className="h-12 w-12"
                    src={product?.thumbnail}
                    alt={product?.title}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({
  autoSearchOptions,
  search,
  onSetSearch,
  page,
  onSetPage,
  totalItems,
  limit,
  onChangeLimit,
}: {
  autoSearchOptions: string[];
  search: string;
  onSetSearch: (value: string) => void;
  page: number;
  onSetPage: (page: number) => void;
  totalItems: number;
  limit: number;
  onChangeLimit: (limit: number) => void;
}) {
  const limits = [10, 20, 30, 50, 100, 200];
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex justify-between mb-2 z-50">
      <div className="relative">
        <input
          autoFocus
          value={search}
          onChange={(e) => onSetSearch(e.target.value)}
          placeholder="Search..."
          className="rounded border px-2 py-0.5 text-sm capitalize"
        />

        <div className="mt-0.5 absolute z-50 min-w-80 shadow max-h-44 overflow-auto">
          {autoSearchOptions?.length
            ? autoSearchOptions?.map((text, index) => (
                <p
                  key={index}
                  className="bg-slate-100 text-sm cursor-pointer hover:bg-slate-200 border-b-slate-300 border-b capitalize py-0.5 px-2"
                  onClick={() => onSetSearch(text)}
                >
                  {text}
                </p>
              ))
            : null}
        </div>
      </div>

      <div className="flex justify-between gap-x-6">
        <div>
          <label className="text-sm">Pages :</label>
          <select
            value={page}
            onChange={(e) => onSetPage(Number(e.target.value))}
            className="border border-slate-200 rounded-md text-sm outline-none"
          >
            {Array(totalPages)
              ?.fill(null)
              ?.map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
          </select>
        </div>

        <div>
          <label className="text-sm">limit :</label>
          <select
            onChange={(e) => {
              onChangeLimit(Number(e.target.value));
              onSetPage(1);
            }}
            className="border border-slate-200 rounded-md text-sm outline-none"
            value={limit}
          >
            {limits.map((limit) => (
              <option key={limit}>{limit}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function Filter({ filters }: { filters: FilterTyeps[] }) {
  return (
    <div className="w-64 bg-white border border-gray-200 shadow-sm mt-8.5">
      <h2 className="font-semibold text-gray-700 p-2 bg-gray-100 mb-3 text-sm">
        Filters
      </h2>

      <div className="space-y-2 p-4">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-500" />
            <span className="text-sm text-gray-700">Beauty</span>
          </div>
          <span className="text-xs text-gray-400">(12)</span>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-500" />
            <span className="text-sm text-gray-700">Fragrances</span>
          </div>
          <span className="text-xs text-gray-400">(8)</span>
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-blue-500" />
            <span className="text-sm text-gray-700">Furniture</span>
          </div>
          <span className="text-xs text-gray-400">(5)</span>
        </label>
      </div>
    </div>
  );
}
