'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/UI/alert-dialog';
import { deleteProduct } from '@/lib/action/product.action';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteAlert {
  product: Products;
}

function DeleteAlert({ product }: DeleteAlert) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Products | null>(null);

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild>
        <button
          onClick={() => {
            setProductToDelete(product);
            setIsModalOpen(true);
          }}
          className="text-destructive hover:text-destructive/80 cursor-pointer"
          title="Delete"
        >
          <Trash2 />
        </button>
      </AlertDialogTrigger>
      {productToDelete && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product {productToDelete.productName} and remove its data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setProductToDelete(null)}
              className="cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (productToDelete) {
                  toast.info('deleting in progress');
                  try {
                    const res = await deleteProduct(
                      productToDelete.id,
                      productToDelete.imageUrls
                    );
                    if (res.success) {
                      toast.success(res.message);
                    } else {
                      toast.error(res.message);
                    }
                  } catch (error) {
                    console.error('Failed to delete product:', error);
                    toast.error(
                      `Failed to delete product "${productToDelete.productName}".`
                    );
                  }
                  setProductToDelete(null);
                  setIsModalOpen(false);
                }
              }}
              className="cursor-pointer bg-red-800 text-white hover:bg-red-800/80"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}

export default DeleteAlert;
