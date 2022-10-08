# Auth API Documentation

### By Malay Bhavsar

<p><b>Base Path:</b> {{url}}/auth</p>
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
    <td>/account</td>
    <td>GET</td>
    <td>Yes</td>
    <td>name, email, password</td>
    <td>Create a new Account. Requires unique email to be used</td>
</tr>
<tr>
    <td>2</td>
    <td>/account</td>
    <td>POST</td>
    <td>No</td>
    <td>-</td>
    <td>Fetch Account details.</td>
</tr>
<tr>
    <td>3</td>
    <td>/login</td>
    <td>POST</td>
    <td>No</td>
    <td>email, password</td>
    <td>TO login to your account</td>
</tr>
<tr>
    <td>4</td>
    <td>/logout</td>
    <td>GET</td>
    <td>Yes</td>
    <td>-</td>
    <td>To logout from your Account and destory the token.</td>
</tr>
</table>
