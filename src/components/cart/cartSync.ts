import { useDispatch } from "react-redux";
import { setCart } from "@/lib/store/cartSlice";
import { cartService } from "@/services/cart/cart.service";
import { ICartItem } from "@/types/cart.types";
import { debounce } from "@/utils/debounce/debounce.utils";

type SyncContext = { dispatch: ReturnType<typeof useDispatch>; queryClient: any };

let _pendingSync: SyncContext | null = null;
let _activeController: AbortController | null = null;

export function abortActiveSync() {
  if (_activeController) {
    _activeController.abort();
    _activeController = null;
  }
}

async function syncCartFromServer(dispatch: ReturnType<typeof useDispatch>, queryClient?: any) {
  abortActiveSync();
  const controller = new AbortController();
  _activeController = controller;

  try {
    const response = await cartService.getCart(controller.signal);
    const data = response?.data?.data;
    if (!data) return;

    const items: ICartItem[] = (data?.items || [])?.map((item: any) => ({
      productId: item?.product?._id || item?.product?.id,
      quantity: item?.quantity,
      product: item?.product,
    }));

    const cartData = {
      items,
      totalItems: items?.reduce((s, i) => s + i?.quantity, 0),
      totalPrice: data?.grandTotal || 0,
      subtotal: data?.grandTotal || 0,
      tax: 0,
      shipping: 0,
      discount: 0,
    };

    dispatch(setCart(cartData));

    if (queryClient) {
      queryClient.setQueryData(["cart"], cartData);
      queryClient.invalidateQueries({ queryKey: ["order", "checkout-summary"] });
    }
  } catch (err) {
    // Ignore Axios cancellation and other errors
  } finally {
    if (_activeController === controller) {
      _activeController = null;
    }
  }
}

export const debouncedGlobalSync = debounce(() => {
  if (_pendingSync) {
    syncCartFromServer(_pendingSync.dispatch, _pendingSync.queryClient);
  }
}, 500);

export function setPendingSync(ctx: SyncContext) {
  _pendingSync = ctx;
}
