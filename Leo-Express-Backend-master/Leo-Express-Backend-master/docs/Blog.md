# Blog API Documentation

### By Malay Bhavsar

<p><b>Base Path:</b> {{url}}/blog</p>
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
    <td>/</td>
    <td>GET</td>
    <td>No</td>
    <td>-</td>
    <td>Returns the list of your notes</td>
</tr>
<tr>
    <td>2</td>
    <td>/</td>
    <td>POST</td>
    <td>Yes</td>
    <td>title, description, tags</td>
    <td>Add a new Blog</td>
</tr>
<tr>
    <td>3</td>
    <td>/</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>blogId, title^, description^, tags^</td>
    <td>To update the blog with id equal to blogId</td>
</tr>
<tr>
    <td>4</td>
    <td>/</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>blogId</td>
    <td>Remove the blog</td>
</tr>
<tr>
    <td>5</td>
    <td>/like</td>
    <td>POST</td>
    <td>Yes</td>
    <td>blogId</td>
    <td>Toggle like to the blog for your account</td>
</tr>
</table>

<br/>
<b><i>^ = optional paramater for the request</i><b>
