import { Button, Input } from "antd";
import React, { useState } from "react";
import Title from "@/shared/ui/Title";
import { useProduct } from "@/features/product";
import { useDebounce } from "@/shared/hooks/useDebounce";

export const SellCreate = React.memo(() => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isCreate, setIsCreate] = useState(false);
  const { getSearchProducts } = useProduct();
  const [state, setState] = useState<string>("");
  const value = useDebounce(state);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const { data } = getSearchProducts({ name: value });

  const handleProduct = ({
    price,
    quantity,
  }: {
    price: string;
    quantity: string;
  }) => {
    if (!selectedProduct) return;

    const newProduct = {
      ...selectedProduct,
      price: Number(price),
      quantity: Number(quantity),
    };

    setProducts((product) => [...product, newProduct]);
    setSelectedProduct(null);
    setPrice("");
    setQuantity("");
    setState("");
  };

  const handleFilterProduct = (index: number) => {
    setProducts((product) => product.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Title className="mb-4">Mahsulot sotish</Title>

      {!selectedProduct && !isCreate && (
        <>
          <div className="max-w-[500px]">
            <Input
              placeholder="Mahsulot nomi"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          {products.length > 0 && (
            <div className="mt-6 space-y-2">
              <Title>Tanlangan mahsulotlar</Title>
              {products.map((item, idx) => (
                <div
                  key={idx}
                  className="border p-2 rounded shadow-sm grid grid-cols-3 items-center gap-2"
                >
                  <div className="col-span-2">
                    <p className="font-semibold">{item.title}</p>
                    <p>Code: {item.productCode}</p>
                    <p>Narxi: {item.price}</p>
                    <p>Soni: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <Button danger onClick={() => handleFilterProduct(idx)}>
                      X
                    </Button>
                  </div>
                </div>
              ))}
              <Button>Sotish</Button>
            </div>
          )}

          {data?.data.length ? (
            <div className="my-6 space-y-2">
              {data?.data?.map((product: any) => (
                <div
                  className="grid grid-cols-2 border p-2 cursor-pointer"
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div>
                    <h3>{product.title}</h3>
                    <p>{product.productCode}</p>
                  </div>
                  <div>
                    <p>{product.price.fprice()}</p>
                    <p>Miqdori: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : value.length ? (
            <Button onClick={() => setIsCreate(true)}>
              Yangi mahsulot yaratish
            </Button>
          ) : null}
        </>
      )}

      {selectedProduct && (
        <div className="max-w-[500px] space-y-4 mt-6 grid grid-cols-3 gap-1.5">
          <Input
            placeholder="Soni"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
          />
          <Input
            placeholder="Narxi"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
          <Button
            type="primary"
            onClick={() => handleProduct({ price, quantity })}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
});
