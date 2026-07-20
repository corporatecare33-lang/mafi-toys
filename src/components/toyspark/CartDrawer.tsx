import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/cart-context";

export function CartDrawer() {
  const { isOpen, setOpen, items, subtotal, updateQty, removeItem, closeCart } = useCart();
  const navigate = useNavigate();

  const checkout = () => {
    closeCart();
    navigate({ to: "/order" });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b p-5">
          <SheetTitle className="flex items-center gap-2 font-display text-2xl">
            <ShoppingBag className="h-5 w-5 text-brand-pink-deep" /> Your Cart
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 ? "Your cart is empty." : `${items.length} item(s) ready to ship.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center text-foreground/60">
              <div>
                <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-brand-pink/40">
                  <ShoppingBag className="h-7 w-7 text-brand-pink-deep" />
                </div>
                <p>Add some magical toys to get started ✨</p>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-2xl bg-muted/40 p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 flex-none rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold leading-tight">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove"
                        className="text-foreground/50 hover:text-brand-red"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-brand-pink-deep">৳{item.price.toFixed(0)}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border bg-white p-0.5">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"
                          aria-label="Increase"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-semibold">
                        ৳{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t bg-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-foreground/70">Subtotal</span>
              <span className="font-display text-2xl font-bold">৳{subtotal.toFixed(0)}</span>
            </div>
            <Button
              onClick={checkout}
              className="w-full rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange py-6 text-base text-white shadow-toy hover:opacity-95"
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
