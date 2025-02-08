basePipCall="$(pip --version)"
toFindPip='pip'
pos=`expr index "$basePipCall" ${toFindPip}`
newStr=${basePipCall:${pos}}
pos1=$(($pos + ${#toFindPip}))
pos2=`expr index "${basePipCall:$pos1}" ' '`
pipVersion="${basePipCall:${pos1}:${pos2}}"
echo "${pipVersion}"