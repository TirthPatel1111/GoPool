# Note API Documentation

### By Malay Bhavsar

<p><b>Base Path:</b> {{url}}/note</p>
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
    <td>Yes</td>
    <td>-</td>
    <td>Returns the list of your notes</td>
</tr>
<tr>
    <td>2</td>
    <td>/</td>
    <td>POST</td>
    <td>Yes</td>
    <td>title, description, priority, deadline</td>
    <td>Create a new Note</td>
</tr>
<tr>
    <td>3</td>
    <td>/</td>
    <td>PUT</td>
    <td>Yes</td>
    <td>noteId, title^, description^, priority^, deadline^</td>
    <td>To update the note with id equal to noteId</td>
</tr>
<tr>
    <td>4</td>
    <td>/</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>noteId</td>
    <td>Remove the note</td>
</tr>
</table>

<br/>
<b><i>^ = optional paramater for the request</i><b>
