# Foodie API Documentation

### By Malay Bhavsar

<p><b>Base Path:</b> {{url}}/foodie</p>
<table>
    <tr>
        <th>Sr No</th>
        <th>Route</th>
        <th>Method</th>
        <th>Token Required</th>
        <th>Data</th>
        <th>Description</th>
    </tr>
<tr>
    <td>1</td>
    <td>/product</td>
    <td>POST</td>
    <td>Yes</td>
    <td>organizationId, [image], name, buyQtyLimit, [ingredients], category, veg, spiceLevel, {availableSizes}</td>
    <td>Add a new product to listing</td>
</tr>
<tr>
    <td>2</td>
    <td>/product</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>productId, organizationId, updates</td>
    <td>Update existing product</td>
</tr>
<tr>
    <td>3</td>
    <td>/product</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>productId, organizationId</td>
    <td>Remove product listing</td>
</tr>
<tr>
    <td>4</td>
    <td>/product/size</td>
    <td>POST</td>
    <td>Yes</td>
    <td>organizationId, productId, data, price, name</td>
    <td>Add size option to an existing product</td>
</tr>
<tr>
    <td>5</td>
    <td>/product/size</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>organizationId, productId, sizeId, name, data, price</td>
    <td>Update size data for a specific product</td>
</tr>
<tr>
    <td>6</td>
    <td>/product/size</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>organizationId, productId, sizeId</td>
    <td>Remove a specific size for a product</td>
</tr>
<tr>
    <td>7</td>
    <td>/cart</td>
    <td>POST</td>
    <td>Yes</td>
    <td>productId, sizeId, qty</td>
    <td>Add product size to cart</td>
</tr>
<tr>
    <td>8</td>
    <td>/cart</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>productId, sizeId, qty</td>
    <td>Update product quantity</td>
</tr>
<tr>
    <td>9</td>
    <td>/cart</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>productId, sizeId</td>
    <td>Remove product quantity from cart</td>
</tr>
<tr>
    <td>10</td>
    <td>/order</td>
    <td>POST</td>
    <td>Yes</td>
    <td>txnId, type, amount</td>
    <td>To place order of all the products in the cart</td>
</tr>
<tr>
    <td>11</td>
    <td>/order</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>orderId</td>
    <td>To cancel the orer placed earlier if possible to do so</td>
</tr>
<tr>
    <td>12</td>
    <td>/organization</td>
    <td>POST</td>
    <td>Yes</td>
    <td>name, image, email</td>
    <td>Enlist an new Organization</td>
</tr>
<tr>
    <td>13</td>
    <td>/organization</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>organizationId, updates:{name, email, image}</td>
    <td>Update Organization Data</td>
</tr>
<tr>
    <td>14</td>
    <td>/organization</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>organizationId</td>
    <td>Remove the organization and related data</td>
</tr>
<tr>
    <td>15</td>
    <td>/franchise</td>
    <td>POST</td>
    <td>Yes</td>
    <td>organizationId, address, city, state, country, openTime, closeTime, coordinates</td>
    <td>Add new Franchise to the organization</td>
</tr>
<tr>
    <td>16</td>
    <td>/franchise</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>organizationId, franchiseId, updates</td>
    <td>Update franchise data</td>
</tr>
<tr>
    <td>17</td>
    <td>/franchise</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>organizationId, franchiseId</td>
    <td>Remove a specific franchise</td>
</tr>
<tr>
    <td>18</td>
    <td>/people</td>
    <td>POST</td>
    <td>Yes</td>
    <td>organizationId, franchiseId, userId</td>
    <td>Add User as an Employee to the organization</td>
</tr>
<tr>
    <td>19</td>
    <td>/people</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>organizationId, franchiseId, userId</td>
    <td>Remove user from employee at the organization</td>
</tr>
</table>
