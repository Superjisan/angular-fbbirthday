BASE_DIR=`dirname $0`

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"
cd
$BASE_DIR/../node_modules/karma/bin/karma start $BASE_DIR/../test/karma.conf.js $*
