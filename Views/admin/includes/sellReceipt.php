<?php

require_once "../../../Models/product.php";
require_once "../../../Models/receipt.php";

require_once "../../../Models/product_receipt.php";

require_once "../../../Controllers/ProductController.php";
require_once "../../../Controllers/ReceiptController.php";


if (isset($_POST['cid'])) {
    

    //add new receipt
    //check if product exists 
    // if not,, add it
    // update existing values and increase the quantity
    //add it to the product_receipt as you have the sku quantity and date 


    $productController=new ProductController;
    $receiptController=new ReceiptController;
    $product_rec=new Product_receipt;

    $receipt=new Receipt;
    $product=new Product();
    $receipt->date=$_POST['date'];
    $receipt->cid=$_POST['cid'];
    $receipt->status="Sell";
    $rid =$receiptController->addReceipt($receipt);

    $noOfProducts=$_POST['noOfProducts'];
    for($i=0;$i<$noOfProducts;$i++)
    {
        // $product->pname=$_POST["name$i"];
        // $product->property=$_POST["property$i"];
        // $product->type=$_POST["type$i"];
        $product->sellprice=$_POST["sellprice$i"];
        $product->sku=$_POST["sku$i"];
        $product->quantity=$_POST["qty$i"];
        //just in case bas never happens;
        if(empty($productController->getProductBySku($product->sku))){
            $productController->addProduct($product);
        }else{
            $productController->sellProductReceipt($product);
        }

        $product_rec->sku=$_POST["sku$i"];
        $product_rec->rid=$rid;
        $product_rec->quantity=$_POST["qty$i"];
        $product_rec->price=$_POST["sellprice$i"];

        $receiptController->addProductToReceipt($product_rec);
    }
    header("location: ../Main.php");

}
