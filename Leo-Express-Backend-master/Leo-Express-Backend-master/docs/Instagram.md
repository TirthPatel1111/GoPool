# Auth API Documentation

### By Malay Bhavsar

<p><b>Base Path:</b> {{url}}/instagram</p>
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
    <td>/register</td>
    <td>POST</td>
    <td>Yes</td>
    <td>username, name, locked</td>
    <td>To register yourself on this app</td>
</tr>
<tr>
    <td>2</td>
    <td>/profile</td>
    <td>GET</td>
    <td>Yes</td>
    <td>userId</td>
    <td>Feth profile of yourself or other people if not locked</td>
</tr>
<tr>
    <td>3</td>
    <td>/profile/icon</td>
    <td>POST</td>
    <td>Yes</td>
    <td>avatar</td>
    <td>To update your profile photo</td>
</tr>
<tr>
    <td>4</td>
    <td>/bio</td>
    <td>POST</td>
    <td>Yes</td>
    <td>bio</td>
    <td>To update your bio in the profile</td>
</tr>
<tr>
    <td>5</td>
    <td>/follow</td>
    <td>POST</td>
    <td>Yes</td>
    <td>userId</td>
    <td>To send a follow request if the account is locked or directly start following</td>
</tr>
<tr>
    <td>6</td>
    <td>/follow</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>userId</td>
    <td>To unfollow someone you are following or sent request</td>
</tr>
<tr>
    <td>7</td>
    <td>/follow/request</td>
    <td>POST</td>
    <td>Yes</td>
    <td>userId</td>
    <td>To approve the pending follow request</td>
</tr>
<tr>
    <td>8</td>
    <td>/follow/request</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>userId</td>
    <td>To reject the pending follow request</td>
</tr>
<tr>
    <td>9</td>
    <td>/follower</td>
    <td>GET</td>
    <td>Yes</td>
    <td>followers</td>
    <td>To get username, name and profileIcon of the follower list</td>
</tr>
<tr>
    <td>10</td>
    <td>/following</td>
    <td>GET</td>
    <td>Yes</td>
    <td>following</td>
    <td>To username, name and profileIcon of the following</td>
</tr>
<tr>
    <td>11</td>
    <td>/pendingfollow</td>
    <td>GET</td>
    <td>Yes</td>
    <td>-</td>
    <td>Get pending follow request for your account</td>
</tr>
<tr>
    <td></td>
    <td>/media/profile</td>
    <td>GET</td>
    <td>Yes</td>
    <td>name</td>
    <td>To fetch the profile icon image form the server</td>
</tr>
<tr>
    <td></td>
    <td>/</td>
    <td>GET POST PUT DELETE</td>
    <td>Yes</td>
    <td></td>
    <td></td>
</tr>
</table>
