/**
 * Created by cuongdq on 5/11/17.
 */

var fs = require('fs');
var http = require('http');
var url = require('url');
var exec = require('child_process').exec;

// App variables
var file_url = ['http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep10_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep9_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep8_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep7_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep6_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/the_race/bbc_therace_ep1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/towardsadvanced/unit_25/bbc_panto_dick_whittington.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit30/u30_alice_episode_10_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit29/u29_alice_episode_9_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit28/u28_alice_in_wonderland_episode_8_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit27/u27_alice_episode_7_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit26/u26_alice_episode_6_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit25/u25_alice_episode_5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit24/u24_alice_episode_4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit23/u23_alice_episode_3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit22/U22_alice_episode_2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit21/U21_alice_episode_1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit20/u20_frankenstein_episode10_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit19/u19_frankenstein_episode9_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit18/u18_frankenstein_episode8_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit17/u17_frankenstein_episode7_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit16/u16_frankenstein_episode6_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit15/u15_frankenstein_episode5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit14/u14_frankenstein_episode4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit13/u13_frankenstein_episode3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/u12_frankenstein_episode2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit11/u11_frankenstein_episode1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit30/b2_u30_gulliver_ep10_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit29/b2_u29_gulliver_ep9_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit28/b2_u28_gulliver_ep8_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit27/b2_u27_gulliver_ep7_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit26/b2_u26_gulliver_ep6_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit25/b2_u25_gulliver_ep5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit24/b2_u24_gulliver_ep4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit23/b2_u23_gulliver_ep3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit22/b2_u22_gulliver_ep2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit21/b2_u21_gulliver_ep1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit20/b2_u20_drama_earnest_ep10_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit19/b2_u19_drama_earnest_ep9_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit18/b2_u18_drama_earnest_ep8_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit17/b2_u17_drama_earnest_ep7_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit16/b2_u16_drama_earnest_ep6_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit15/b2_u15_drama_earnest_ep5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit14/b2_u14_drama_earnest_ep4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit13/b2_u13_drama_earnest_ep3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit12/b2_u12_drama_earnest_ep2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit11/b2_u11_earnest_ep1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit10/b2_u10_jamaica_inn_episode_10_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit9/b2_u9_jamaica_inn_episode_9_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit8/b2_u8_ep8_jamaica_inn_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit7/b2_u7_jamaica_inn_episode_7_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit6/b2_u6_jamaica_inn_episode6_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit5/b2_u5_jamaica_inn_episode_5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit4/b2_u4_jamaica_inn_4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit3/b2_u3_jamaica_inn_3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit2/b2_u2_jamaica_inn_2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit1/b2_u1_jamaica_inn_1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit30/u30_alice_episode_10_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit29/u29_alice_episode_9_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit29/u29_alice_episode_9_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit28/u28_alice_in_wonderland_episode_8_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit27/u27_alice_episode_7_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit26/u26_alice_episode_6_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit25/u25_alice_episode_5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit24/u24_alice_episode_4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit23/u23_alice_episode_3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit22/U22_alice_episode_2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit21/U21_alice_episode_1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep5_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep4_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep3_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/lowerintermediate/unit12/bbc_drama_a_christmas_carol_ep1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/6min/170420_6min_sighing_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/tews/170425_tews_jack_of_all_trades_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/tews/170418_tews_the_coast_is_clear_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit1/b2_u1_jamaica_inn_1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170419_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170412_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170405_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170329_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170322_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170315_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170308_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170301_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170222_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170215_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170208_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170201_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170125_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170118_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170111_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170104_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161228_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161221_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161214_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161207_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161130_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161123_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161116_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161109_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161102_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161026_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161019_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161012_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/161005_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160928_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160921_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160914_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160907_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160831_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160824_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160810_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160803_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160727_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160720_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160713_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160706_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160629_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160622_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160615_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160608_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160601_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160525_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160518_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160224_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160217_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160210_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/160203_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170426_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/tews/170502_tews_it_wont_wash_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/tews/170509_tews_it_comes_with_the_territory_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170503_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/lingohack/170510_lingohack_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/6min/170427_6min_engl_miraculous_survival_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/6min/170504_6min_english_super_rich_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/features/6min/170511_6min_food_waste_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit1/b2_u1_jamaica_inn_1_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit2/b2_u2_jamaica_inn_2_download.mp3',
    'http://downloads.bbc.co.uk/learningenglish/intermediate/unit3/b2_u3_jamaica_inn_3_download.mp3'];

var DOWNLOAD_DIR = './downloads/';

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory
var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
    if (err) throw err;
    else {
        file_url.forEach(function(element) {
            download_file_httpget(element);
        });
    }
});

// Function to download file using HTTP.get
var download_file_httpget = function(file_url) {
    var options = {
        host: url.parse(file_url).host,
        port: 80,
        path: url.parse(file_url).pathname
    };

    var file_name = url.parse(file_url).pathname.split('/').pop();
    var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

    http.get(options, function(res) {
        res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
        });
    });
};