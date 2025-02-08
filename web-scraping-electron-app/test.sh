findVersion(){
	baseCall=eval $1
	toFind=$2
	pos=`expr index "$baseCall" ${toFind}`
	newStr=${baseCall:${pos}}
	pos1=$(($pos + ${#toFind}))
	pos2=`expr index "${baseCall:$pos1}" ' '`
	
	return "${baseCall:${pos1}:${pos2}}"
}

testFunc(){
	baseCall=eval $1

	toFind=$2
	toEnd=$3
	pos=`expr index "$baseCall" ${toFind}`
	pos1=$(($pos + ${#toFind} - 1))
	pos2=`expr index "${baseCall:$pos1}" $toEnd`
	result="${baseCall:${pos1}:${pos2}}"
	
	echo $pos1
	return $result
	
}

val="pip --version"
echo ${val:0:2}

testFunc "pip --version" "pip "

vs=$(testFunc "pip --version" "pip " " ")
