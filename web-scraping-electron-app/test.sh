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
	pos=`expr index "$baseCall" ${toFind}`

	return $pos
	
}

t=$(testFunc "pip --version" "pip")
