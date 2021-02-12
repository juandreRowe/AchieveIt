<!DOCTYPE html>
<html>
    <head>
        <title>Goals</title>
        <meta content="width=device-width,intitial-scale=1.0" name="viewport">
        <link rel="stylesheet" type="text/css" href="styles/form.css"/>
    </head>
    <body>
        <?php 
        $curl = curl_init();
        curl_setopt ($curl, CURLOPT_URL, "https://momentumappliances.000webhostapp.com/FirstApi/index.php?action=getGoalById&id=" . $_POST["Id"]);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    
        $result = curl_exec ($curl);
        curl_close ($curl);
        $array = json_decode($result);
        
        echo'<div class="container">
            <div class="goal">
            <div class="form_header">Enter Goal:</div>
            <form action="../FirstApi/index.php" method="post">
            <input type="hidden" id="action" name="action" value="update"/>
            
            <input type="hidden" required id="Id" name="Id" min="1" value="'. $_POST["Id"] .'"/>
            
            <input type="text" required id="Description" name="Description" class="txt" value="' . $array[0]->Description . '"/>
            
            ';
            if($array[0]->Completed == 0){
                echo '
                <input type="radio" class="chk" name="Completed" value="1"/><span class="rem">Done</span>
				<input type="radio" class="chk" name="Completed" value="0" checked/><span class="rem">Not Done</span><br>
                ';
            }else{
                echo '
                <input type="radio" class="chk" name="Completed" value="1" checked/><span class="rem">Done</span>
				<input type="radio" class="chk" name="Completed" value="0"/><span class="rem">Not Done</span><br>
                ';
            }
            
            
            echo '<input type="submit" value="Submit" class="btn"/>
        </form>
    </div>
</div>'
        ?>
    </body>
</html>