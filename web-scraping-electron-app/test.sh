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

	prefix=${baseCall%%$substr*}
	index=${#prefix}
	
	toEnd=$3
	pos=`expr index "$baseCall" ${toFind}`
	pos0=${baseCall%%toFind*}

	startCut=$baseCall | cut -d$toFind -f 2
	echo $startCut

	pos1=$(($pos + ${#toFind} - 1))
	temp=${baseCall:5:2}
	sliceEnd=${${baseCall:pos1}%%$toEnd*}
	
	result="${baseCall:${pos1}:${pos2}}"
	
	
	return $result
}

testFun2(){
	str=$(eval $1)
	toFind=$2
	toEnd=$3
	
	prefix=${str%%$toFind*}
	#prefix=${str%%"pip"*}
	index=$((${#prefix} + ${#toFind}))
	backStr=${str:index}
	endStr=${backStr%%$toEnd*}
	endIndex=${#endStr}
	#echo "HHHHHHHHHHHH"
	#echo $str
	#echo ${#str}
	#echo "HHHHHHHHHHHH"
	echo $endStr
	
}

test3(){
	str= eval $1 
	#echo $str
	echo 5
}


val="pip --version"
tee=$(testFun2 "pip --version" "pip " "from")
#echo $tee
teem=$(test3)
#echo $test3
testFun2 "pip --version" "pip" " "
#test3 "pip --version"

#echo $val | cut -d" " -f 2
#echo ${val:0:2}

#testFunc "pip --version" "pip " " "

#vs=$(testFunc "pip --version" "pip " " ")
