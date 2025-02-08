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
	echo 
	#echo "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"

	echo $result
}

#pipVersion=$(findVersion "pip --version" "pip " " from")
#findVersion "label-studio version" "Label Studio version: " "{"

#echo "HHHHHHHH $labelStudioVersion HHHHHHHH"

funcTest(){
	local str=$(eval "label-studio version")
	testVal=${#str}
	echo "HHHHHHHHH $testVal HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
}

checkAndUpdate(){
	expected=$1
	actual=$2
	updateCode=$3

	result=$(checkVersioning $expected $actual)
	if ((1 - $result)); then
		echo "updating..."

		eval $updateCode

		echo "updated!"
	fi

	echo "done"
}


checkAllVersioning(){
	pipVersion=$(findVersion "pip --version" "pip " " from")
	ePipVersion="24.2"
	pipUpdate="python -m pip install --upgrade pip"

	pipResult=$(checkAndUpdate $ePipVersion $pipVersion $pipUpdate)


	electronVersion=$(findVersion "./node_modules/.bin/electron-forge --version" "system" "")
	echo $electronVersion

	# Currently nonfunctional
	#labelStudioVersion=$(findVersion "label-studio version" "Label Studio version: " '}')
}

# 1 is true, 0 is false. returns true if expected (var 1) is less than or equal to actual (var 2)
checkVersioning(){
	local expected=$1
	local actual=$2

	IFS="." read -ra VALSe <<< "$expected"
	IFS="." read -ra VALSa <<< "$actual"

	local result=1
	local maxe=${#VALSe[@]}
	local maxa=${#VALSa[@]}
	max=$maxe
	if ((maxe > maxa)); then
		max=$maxa
	fi

	local i=0
	while ((i<$max));do
		#echo "i: $i , e: ${VALSe[$i]} , a: ${VALSa[$i]}"
		if ((${VALSa[$i]} < ${VALSe[$i]})); then
			result=0
			i=$max
		fi
		i=$(($i + 1))
	done

	echo $result
}

checkAllVersioning