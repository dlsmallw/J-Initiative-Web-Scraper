
func(){
	result=${eval "yarn upgrade --latest"}

	# check if result contains an error about an outdated lockfile. If yes, run yarn install
}
