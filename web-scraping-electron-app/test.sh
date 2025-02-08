findVersion(){
	str=$(eval $1)
	toFind=$2
	toEnd=$3
	
	prefix=${str%%$toFind*}
	#prefix=${str%%"pip"*}
	index=$((${#prefix} + ${#toFind}))
	backStr=${str:index}
	endStr=${backStr%%$toEnd*}
	endIndex=${#endStr}
	result=${backStr:0:$endIndex}

	echo $result
}

pipVersion=$(findVersion "pip --version" "pip " " from")


#test3 "pip --version"

#echo $val | cut -d" " -f 2
#echo ${val:0:2}

#testFunc "pip --version" "pip " " "

#vs=$(testFunc "pip --version" "pip " " ")
