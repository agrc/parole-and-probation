const supervisionItems = [{
    name: 'CCC',
    id: 'ccc',
    default: false
}, {
    name: 'PVP',
    id: 'pvp',
    default: false
}, {
    name: 'COMP',
    id: 'comp',
    default: false
}, {
    name: 'DEP',
    id: 'dep',
    default: false
}, {
    name: 'EM',
    id: 'em',
    default: true
}, {
    name: 'GPS',
    id: 'gps',
    default: true
}, {
    name: 'SO',
    id: 'so',
    default: true
}, {
    name: 'SO-A',
    id: 'soa',
    default: true
}, {
    name: 'SO-B',
    id: 'sob',
    default: true
}, {
    name: 'SO-C',
    id: 'soc',
    default: true
}, {
    name: 'FUG',
    id: 'fug',
    default: false
}, {
    name: 'INCAR',
    id: 'incar',
    default: false
}, {
    name: 'RESID',
    id: 'resid',
    default: false
}, {
    name: 'DRUG CT',
    id: 'drugct',
    default: false
}, {
    name: 'DORA',
    id: 'dora',
    default: true
}, {
    name: 'ECR',
    id: 'ecr',
    default: true
}, {
    name: 'FOSI',
    id: 'fosi',
    default: true
}, {
    name: 'IG INT',
    id: 'igint',
    default: true
}, {
    name: 'MIO',
    id: 'mio',
    default: true
}];

const mainGangs = [{
    name: 'sureno',
    id: 1
}, {
    name: 'nortenos',
    id: 2
}, {
    name: 'omg - outlaw motorcycl',
    id: 3
}, {
    name: 'white supremacist',
    id: 4
}, {
    name: 'crip',
    id: 5
}, {
    name: 'bloods',
    id: 6
}, {
    name: 'people nation',
    id: 7
}, {
    name: 'folk nation',
    id: 8
}, {
    name: 'others',
    id: 9
}, {
    name: 'no type specified',
    id: 10
}, {
    name: 'vlt',
    id: 11
}, {
    name: 'o13',
    id: 12
}, {
    name: 'qvo',
    id: 13
}];

const offenseTypes = [{
    name: 'murder',
    id: 'A'
}, {
    name: 'sex/registerable',
    id: 'D'
}, {
    name: 'sex/non-registerable',
    id: 'E'
}, {
    name: 'person',
    id: 'G'
}, {
    name: 'alcohol & drug',
    id: 'J'
}, {
    name: 'property',
    id: 'M'
}, {
    name: 'weapons',
    id: 'P'
}, {
    name: 'driving',
    id: 'S'
}, {
    name: 'other',
    id: 'V'
}, {
    name: 'drug possession only',
    id: 'X'
}, {
    name: 'unknown',
    id: 'Z'
}];

const agents = [
    { value: 'AARON ANDERSON', id: 181698, supervisor: 'TERRY BANKS' },
    { value: 'AARON CARVER', id: 141382, supervisor: 'JAMES CAMPOS' },
    { value: 'AARON LEE', id: 176268, supervisor: 'KIRK LAMBERT' },
    { value: 'AARON POWELL', id: 205182, supervisor: 'VIDA BETTS' },
    { value: 'AARON SMITH', id: 166086, supervisor: 'STEVE WILLIAMSON' },
    { value: 'ADAM CHARD', id: 169801, supervisor: 'MICHAEL RENCKERT' },
    { value: 'ALAN DRESSLER', id: 182822, supervisor: 'RICHARD GLEN MORRIS' },
    { value: 'ALBERT WHITEHORSE', id: 105493, supervisor: 'WADE ALLINSON' },
    { value: 'ALEJANDRO REYES-GALDAMEZ', id: 183010, supervisor: 'KATIE CARVER' },
    { value: 'ALIE CARLSON', id: 198635, supervisor: 'WILLIAM MORELL' },
    { value: 'ALLEN JULIAN', id: 112738, supervisor: 'TONY GARRETT' },
    { value: 'ALLEN RUECKERT', id: 196382, supervisor: 'JOHN CARPENTER' },
    { value: 'AMBERDEE MILLER', id: 182991, supervisor: 'KILEY D WILLIS' },
    { value: 'ANA M MASCIANTONIO', id: 182708, supervisor: 'DANIEL SCHUGK' },
    { value: 'ANDREA HAIGHT', id: 198755, supervisor: 'BLAKE BEESLEY' },
    { value: 'ANDREW ARCHULETA', id: 199003, supervisor: 'GREG SMITH' },
    { value: 'ANDREW BURDINE', id: 198624, supervisor: 'JASON LOERTSCHER' },
    { value: 'ANDREW DALTON', id: 196368, supervisor: 'CLINTON LUND' },
    { value: 'ANDREW MCKEON', id: 199032, supervisor: 'MICHAEL RENCKERT' },
    { value: 'ANGELA HENDRIX', id: 143739, supervisor: 'IRVIN B. HALE' },
    { value: 'ANGELA SYMONDS', id: 115648, supervisor: 'NATHAN ELDRIDGE' },
    { value: 'ANTHONY CANDELARIA', id: 166089, supervisor: 'TERRY BANKS' },
    { value: 'ANTOINETTE AIONO', id: 120606, supervisor: 'KODY FLOYD' },
    { value: 'AUDREY BROWN', id: 158655, supervisor: 'KATIE CARVER' },
    { value: 'AUSTIN KENNINGTON', id: 181817, supervisor: 'RICHARD GLEN MORRIS' },
    { value: 'AUSTIN Q ROBERTS', id: 184259, supervisor: 'DANIEL HAYS' },
    { value: 'AUSTIN RHEES', id: 194509, supervisor: 'PRESTON KAY' },
    { value: 'BARRY HANSEN', id: 106821, supervisor: 'JAMES CLEGG' },
    { value: 'BART WOOLLEY', id: 155449, supervisor: 'GREG SMITH' },
    { value: 'BEAU BROMLEY', id: 164036, supervisor: 'RANDI CARTER' },
    { value: 'BEN BROADBENT', id: 205420, supervisor: 'ELDON HAMELIN' },
    { value: 'BLAINE BILLS', id: 112112, supervisor: 'KIRK LAMBERT' },
    { value: 'BLAKE BEESLEY', id: 113048, supervisor: 'CRAIG GREENBERG' },
    { value: 'BLAKE DENNEY', id: 195440, supervisor: 'DANIEL SCHUGK' },
    { value: 'BLAKE WRIGHT', id: 102267, supervisor: 'KODY FLOYD' },
    { value: 'BO B REIER', id: 191519, supervisor: 'GREGORY PERRY' },
    { value: 'BOB HAGGERTY', id: 161052, supervisor: 'JACOB ROMERO' },
    { value: 'BOYD GLEDHILL', id: 105454, supervisor: 'LUKE LASSITER' },
    { value: 'BRAD D LUND', id: 192689, supervisor: 'KATIE CARVER' },
    { value: 'BRAD DRAPER', id: 165015, supervisor: 'ELDON HAMELIN' },
    { value: 'BRAD JOHNSON', id: 190286, supervisor: 'WILLIAM LUKE' },
    { value: 'BRADY BARNEY', id: 198358, supervisor: 'ALLEN JULIAN' },
    { value: 'BRANDON K VOYLES', id: 189784, supervisor: 'JARED FREEMAN' },
    { value: 'BRANDON W MEADOWS', id: 191429, supervisor: 'LUKE LASSITER' },
    { value: 'BRANIGAN M SATTERFIELD', id: 191872, supervisor: 'ROBERT CID' },
    { value: 'BRETT BUTLER', id: 113434, supervisor: 'ADRIAN EADS' },
    { value: 'BRETT CURTIS', id: 164645, supervisor: 'DANIEL HAYS' },
    { value: 'BRETT LARSEN', id: 175211, supervisor: 'MICHAEL ADAM' },
    { value: 'BRI SACKETT', id: 209203, supervisor: 'VIDA BETTS' },
    { value: 'BRIAN HAMBLIN', id: 161072, supervisor: 'STEVE YEATES' },
    { value: 'BRIAN K. LYTHGOE', id: 160737, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'BRIAN M ANHDER', id: 189824, supervisor: 'KODY FLOYD' },
    { value: 'BRIAN PETERSON', id: 158592, supervisor: 'ROBERT CID' },
    { value: 'BRIAN WILLMORE', id: 172528, supervisor: 'RANDI CARTER' },
    { value: 'BRITTAN PETERSEN', id: 192642, supervisor: 'BRIAN HAMBLIN' },
    { value: 'BRITTANY ROTHE', id: 195409, supervisor: 'WILLIAM LUKE' },
    { value: 'BROCK TRESEDER', id: 128476, supervisor: 'JAMES CLEGG' },
    { value: 'BRYAN S BRITTON', id: 184233, supervisor: 'JOSHUA DRAPER' },
    { value: 'BRYAN S. AITKEN', id: 165351, supervisor: 'GREG SMITH' },
    { value: 'BRYAN TALBOT', id: 168086, supervisor: 'DANIEL SCHUGK' },
    { value: 'CADEN WALKER', id: 202326, supervisor: 'WILLIAM LUKE' },
    { value: 'CALVIN N. PICKETT', id: 147590, supervisor: 'ALLEN JULIAN' },
    { value: 'CHARLES CHAPPELL', id: 167690, supervisor: 'GREG SMITH' },
    { value: 'CHARLES FRAZIER', id: 176015, supervisor: 'MICHAEL RENCKERT' },
    { value: 'CHASE WITHERS', id: 197479, supervisor: 'JACOB ROMERO' },
    { value: 'CHRIS CARTER', id: 133697, supervisor: 'KATIE CARVER' },
    { value: 'CHRIS COOMBS', id: 152612, supervisor: 'JACOB ROMERO' },
    { value: 'CHRIS PACKER', id: 164752, supervisor: 'MICHAEL ADAM' },
    { value: 'CHRISTA COLBY', id: 185646, supervisor: 'LEEANN DUNFORD' },
    { value: 'CHRISTINE E GONZALEZ', id: 185693, supervisor: 'MARK COLBY' },
    { value: 'CHRISTOPHER A. HOPKINS', id: 154558, supervisor: 'RICK SMITH' },
    { value: 'CHRISTOPHER ASTLE', id: 187199, supervisor: 'WILLIAM MORELL' },
    { value: 'CHRISTOPHER BIRD', id: 172524, supervisor: 'GREG SMITH' },
    { value: 'CHRISTOPHER BOHN', id: 175994, supervisor: 'JASON LOERTSCHER' },
    { value: 'CHRISTOPHER MICKELSON', id: 139848, supervisor: 'MICHAEL RENCKERT' },
    { value: 'CHRISTOPHER ROBERTS', id: 175167, supervisor: 'TERRY BANKS' },
    { value: 'CLAUDIO B CUEVA', id: 188451, supervisor: 'TERRY BANKS' },
    { value: 'CLAY YARDLEY', id: 100821, supervisor: 'JAMES CAMPOS' },
    { value: 'CLIFF HAMILTON', id: 208006, supervisor: 'JOSHUA DRAPER' },
    { value: 'CLINTON M HANSEN', id: 184252, supervisor: 'TERRY BANKS' },
    { value: 'COREY MCEWAN', id: 171952, supervisor: 'JAMES ADAMSON' },
    { value: 'CORY R GRINT', id: 184184, supervisor: 'LUKE LASSITER' },
    { value: 'CRAIG HANSEN', id: 204686, supervisor: 'JASON LOERTSCHER' },
    { value: 'CRYSTAL BLASI', id: 200783, supervisor: 'KIRK LAMBERT' },
    { value: 'DAN HEATH', id: 196365, supervisor: 'DAVID TRAHAN' },
    { value: 'DANE PETERSON', id: 176275, supervisor: 'DANIEL SCHUGK' },
    { value: 'DANIEL A. NIEBUHR', id: 160284, supervisor: 'DAVID TRAHAN' },
    { value: 'DANIEL FERRON', id: 189796, supervisor: 'KODY FLOYD' },
    { value: 'DANIEL GORDON', id: 114442, supervisor: 'STEVE WILLIAMSON' },
    { value: 'DANIEL GUNRUD', id: 169052, supervisor: 'JASON LOERTSCHER' },
    { value: 'DANIEL HAMPTON', id: 194464, supervisor: 'DANIEL SCHUGK' },
    { value: 'DANIEL JORGENSEN', id: 134413, supervisor: 'JAMES ADAMSON' },
    { value: 'DANIEL S BARRETT', id: 191379, supervisor: 'RICK SMITH' },
    { value: 'DANIEL SCHUGK', id: 163372, supervisor: 'ANNETTE SALGADO' },
    { value: 'DANTE DETTAMANTI', id: 181705, supervisor: 'JASON LOERTSCHER' },
    { value: 'DAVID AH CURTIS', id: 184248, supervisor: 'NATHAN ELDRIDGE' },
    { value: 'DAVID ANDERSEN', id: 159164, supervisor: 'RANDI CARTER' },
    { value: 'DAVID BEAL', id: 203017, supervisor: 'RANDI CARTER' },
    { value: 'DAVID GAFFNEY', id: 166498, supervisor: 'MICHAEL RENCKERT' },
    { value: 'DAVID HANNA', id: 176016, supervisor: 'GREGORY PERRY' },
    { value: 'DAVID JONES', id: 163407, supervisor: 'JAMES ADAMSON' },
    { value: 'DAVID OWENS', id: 154429, supervisor: 'DAVID LOWRY' },
    { value: 'DAVID PEDERSEN', id: 198634, supervisor: 'GREGORY PERRY' },
    { value: 'DAVID PENROD', id: 187203, supervisor: 'RYAN PROCTOR' },
    { value: 'DEAN ADAMS', id: 207148, supervisor: 'BLAKE BEESLEY' },
    { value: 'DEBBIE PARENZIN', id: 104483, supervisor: 'KILEY D WILLIS' },
    { value: 'DEBBY JENSEN', id: 119260, supervisor: 'CLINTON LUND' },
    { value: 'DENTON CALL', id: 207962, supervisor: 'KIRK LAMBERT' },
    { value: 'DEON WALSER', id: 187762, supervisor: 'KODY FLOYD' },
    { value: 'DERRICK CUMBEE', id: 195173, supervisor: 'ROBERT CID' },
    { value: 'DOUG CHAMBERS', id: 119930, supervisor: 'JUSTIN SCHELIN' },
    { value: 'DUSTIN ANDERSON', id: 211306, supervisor: 'VIDA BETTS' },
    { value: 'DUSTIN APPEL', id: 175696, supervisor: 'JAMES ADAMSON' },
    { value: 'DUSTIN R. VEATER', id: 144439, supervisor: 'ALLEN JULIAN' },
    { value: 'ELDON HAMELIN', id: 151860, supervisor: 'WADE ALLINSON' },
    { value: 'EMILY MCROBERTS', id: 169064, supervisor: 'DANIEL HAYS' },
    { value: 'ERIC S JACOBSON', id: 188426, supervisor: 'JOHN CARPENTER' },
    { value: 'ERICK LEBRON', id: 196967, supervisor: 'WILLIAM LUKE' },
    { value: 'ERIK OLSEN', id: 168129, supervisor: 'RANDI CARTER' },
    { value: 'EROS AREVALO', id: 130981, supervisor: 'GREG SMITH' },
    { value: 'EVERETT M GIST', id: 184250, supervisor: 'JAMES CLEGG' },
    { value: 'EVERETT WESTERMAN', id: 112334, supervisor: 'DAVID TRAHAN' },
    { value: 'GAIL ROSKELLEY', id: 104863, supervisor: 'KIRK LAMBERT' },
    { value: 'GALIT LEVANON-ARELLANO', id: 204550, supervisor: 'TERRY BANKS' },
    { value: 'GARY P TIDWELL', id: 192644, supervisor: 'WILLIAM MORELL' },
    { value: 'GERIT ASAY', id: 176283, supervisor: 'DARIN VAN LEEUWEN' },
    { value: 'GLENN C. SMITH', id: 152637, supervisor: 'KIRK LAMBERT' },
    { value: 'GRANT GUSTAVESON', id: 182995, supervisor: 'ROBERT CID' },
    { value: 'GREG HUNT', id: 204011, supervisor: 'DANIEL HAYS' },
    { value: 'GREG OWENS', id: 208455, supervisor: 'GREGORY PERRY' },
    { value: 'GREGORY APGOOD', id: 187198, supervisor: 'WILLIAM MORELL' },
    { value: 'HEATHER HENRIE', id: 155880, supervisor: 'LEEANN DUNFORD' },
    { value: 'HEATHER WEST', id: 187523, supervisor: 'ADRIAN EADS' },
    { value: 'HILARY JENSEN', id: 128477, supervisor: 'RANDI CARTER' },
    { value: 'IAN ADAMS', id: 172447, supervisor: 'DAVID LOWRY' },
    { value: 'JACKIE GODFREY', id: 186665, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'JACLYN PACE', id: 197501, supervisor: 'RANDI CARTER' },
    { value: 'JACOB COLEMAN', id: 211910, supervisor: 'STEVE WILLIAMSON' },
    { value: 'JAEME SOLIS', id: 181715, supervisor: 'JAMES CLEGG' },
    { value: 'JAKE DOWNS', id: 209418, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'JAMES ADAMSON', id: 119047, supervisor: 'IRVIN B. HALE' },
    { value: 'JAMES CAMPOS', id: 141679, supervisor: 'STEVE YEATES' },
    { value: 'JAMES CLEGG', id: 158584, supervisor: 'STEVE YEATES' },
    { value: 'JAMES GARRETT', id: 149448, supervisor: 'DAVID LOWRY' },
    { value: 'JAMES LEGORE', id: 141676, supervisor: 'MICHAEL RENCKERT' },
    { value: 'JAMES WEAVER', id: 112150, supervisor: 'VIDA BETTS' },
    { value: 'JANECA KLAYKO', id: 211299, supervisor: 'ALBERT WHITEHORSE' },
    { value: 'JARED BONKOSKY', id: 164530, supervisor: 'WILLIAM LUKE' },
    { value: 'JARED M. MINNOCH', id: 130103, supervisor: 'JAMES CAMPOS' },
    { value: 'JARED ROSE', id: 203821, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'JARROD L. IRVIN', id: 203820, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'JASON FAIRBANKS', id: 173027, supervisor: 'RANDI CARTER' },
    { value: 'JASON HANSEN', id: 160997, supervisor: 'RYAN PROCTOR' },
    { value: 'JASON ROOTHOFF', id: 168608, supervisor: 'KILEY D WILLIS' },
    { value: 'JAY BIGLE', id: 196307, supervisor: 'JUSTIN SCHELIN' },
    { value: 'JAY L COATES', id: 158606, supervisor: 'JACOB ROMERO' },
    { value: 'JAY ROSS', id: 134467, supervisor: 'ANGELA HENDRIX' },
    { value: 'JEFF SHARDLOW', id: 159946, supervisor: 'SPENCER TURLEY' },
    { value: 'JEFFERY T HOWCROFT', id: 184235, supervisor: 'GREGORY PERRY' },
    { value: 'JEFFREY P HUME', id: 183320, supervisor: 'ROBERT CID' },
    { value: 'JENNIFER M. MURRAY', id: 150794, supervisor: 'MARK COLBY' },
    { value: 'JEREMY NELSON', id: 128009, supervisor: 'KIRK LAMBERT' },
    { value: 'JEREMY SHAW', id: 109983, supervisor: 'TERRY BANKS' },
    { value: 'JEROMY SAMPSON', id: 132917, supervisor: 'BRIAN HAMBLIN' },
    { value: 'JERRID DOCKERY', id: 175096, supervisor: 'JUSTIN SCHELIN' },
    { value: 'JERRY COOK', id: 105873, supervisor: 'JAMES ADAMSON' },
    { value: 'JESS A. PLOUZEK', id: 155411, supervisor: 'KATIE CARVER' },
    { value: 'JOE A MURPHY', id: 191515, supervisor: 'JASON LOERTSCHER' },
    { value: 'JOHN B LIVINGSTON', id: 189791, supervisor: 'WILLIAM MORELL' },
    { value: 'JOHN B WHITED', id: 184262, supervisor: 'ANGELA HENDRIX' },
    { value: 'JOHN CARPENTER', id: 138697, supervisor: 'IRVIN B. HALE' },
    { value: 'JOHN KELLEY', id: 176053, supervisor: 'BRIAN HAMBLIN' },
    { value: 'JOHN POWELL', id: 186609, supervisor: 'VIDA BETTS' },
    { value: 'JOHNATHAN VASQUEZ', id: 153535, supervisor: 'VIDA BETTS' },
    { value: 'JON KELLY MAXWELL', id: 131920, supervisor: 'DAVID LOWRY' },
    { value: 'JONATHAN SMITH', id: 211625, supervisor: 'GREGORY PERRY' },
    { value: 'JORDAN P BONYAI', id: 201452, supervisor: 'CLINTON LUND' },
    { value: 'JOSEPH C ABBOTT', id: 133793, supervisor: 'PRESTON KAY' },
    { value: 'JOSEPH F. LANEY', id: 150617, supervisor: 'ALBERT WHITEHORSE' },
    { value: 'JOSEPH HERMAN', id: 183001, supervisor: 'WILLIAM LUKE' },
    { value: 'JOSH BAIRD', id: 190147, supervisor: 'SETH ROBINSON' },
    { value: 'JOSHUA DRAPER', id: 163417, supervisor: 'KARL KENNINGTON' },
    { value: 'JUSTIN KECK', id: 178404, supervisor: 'DAVID TRAHAN' },
    { value: 'KACEN GUBLER', id: 208160, supervisor: 'RICHARD GLEN MORRIS' },
    { value: 'KAREN PREVEDEL', id: 111596, supervisor: 'BRIAN HAMBLIN' },
    { value: 'KARL NORTH', id: 195436, supervisor: 'ROBERT CID' },
    { value: 'KARSON WELCH', id: 167709, supervisor: 'KILEY D WILLIS' },
    { value: 'KATHY COWLEY', id: 180119, supervisor: 'DAVID LOWRY' },
    { value: 'KATHY SCOTT', id: 111063, supervisor: 'MICHAEL RENCKERT' },
    { value: 'KAYE HOUSTON', id: 150962, supervisor: 'LEEANN DUNFORD' },
    { value: 'KELEPI VAEA', id: 187226, supervisor: 'GREG SMITH' },
    { value: 'KELLY GARDNER', id: 142750, supervisor: 'JOHN CARPENTER' },
    { value: 'KENDU GIVENS', id: 194458, supervisor: 'DANIEL HAYS' },
    { value: 'KENNETH COX', id: 200041, supervisor: 'GREGORY PERRY' },
    { value: 'KERRIE TURRILL', id: 103975, supervisor: 'ALLEN JULIAN' },
    { value: 'KEVIN HIZER', id: 183823, supervisor: 'CLINTON LUND' },
    { value: 'KEVIN LARSEN', id: 179450, supervisor: 'RICHARD GLEN MORRIS' },
    { value: 'KEVIN MORRIS', id: 111832, supervisor: 'WILLIAM MORELL' },
    { value: 'KIM SEEGMILLER', id: 134132, supervisor: 'RICHARD GLEN MORRIS' },
    { value: 'KIM WEISNER', id: 131576, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'KIMBERLY RODELL', id: 207786, supervisor: 'KODY FLOYD' },
    { value: 'KIRK LAMBERT', id: 172876, supervisor: 'KARL KENNINGTON' },
    { value: 'KRISTA HOOKS', id: 148686, supervisor: 'GREGORY PERRY' },
    { value: 'KYLE CELAURO', id: 183492, supervisor: 'BRIAN HAMBLIN' },
    { value: 'KYLE GROVES', id: 166500, supervisor: 'WILLIAM MORELL' },
    { value: 'KYRA SMITH', id: 115216, supervisor: 'JASON LOERTSCHER' },
    { value: 'LEIONI IKA', id: 121985, supervisor: 'RICHARD GLEN MORRIS' },
    { value: 'LEISA BANKHEAD', id: 148151, supervisor: 'BLAKE BEESLEY' },
    { value: 'LIBERTY YATES', id: 205190, supervisor: 'KILEY D WILLIS' },
    { value: 'LINDSEY CALL', id: 207870, supervisor: 'JAMES CLEGG' },
    { value: 'LUKE LASSITER', id: 186669, supervisor: 'WADE ALLINSON' },
    { value: 'LYNDA HAMILTON', id: 111069, supervisor: 'KATIE CARVER' },
    { value: 'MADELINE KAYE', id: 138231, supervisor: 'WILLIAM LUKE' },
    { value: 'MARC MILLER', id: 198447, supervisor: 'KIRK LAMBERT' },
    { value: 'MARIANNE HALL', id: 143654, supervisor: 'LEEANN DUNFORD' },
    { value: 'MARK OTTESEN', id: 114323, supervisor: 'CLINTON LUND' },
    { value: 'MARSHA SURGEON', id: 101370, supervisor: 'JAMES CLEGG' },
    { value: 'MATT HAUN', id: 173038, supervisor: 'KATIE CARVER' },
    { value: 'MATTHEW FAIRBANK', id: 142749, supervisor: 'STEVE WILLIAMSON' },
    { value: 'MATTHEW G FAIRBROTHER', id: 189827, supervisor: 'JARED FREEMAN' },
    { value: 'MATTHEW HARDING', id: 207816, supervisor: 'ALLEN JULIAN' },
    { value: 'MATTHEW JENSEN', id: 164026, supervisor: 'JAMES ADAMSON' },
    { value: 'MATTHEW RIGBY', id: 158611, supervisor: 'ALLEN JULIAN' },
    { value: 'MEGAN B THOMSON', id: 187061, supervisor: 'GREG SMITH' },
    { value: 'MICHAEL BULLOCK', id: 116096, supervisor: 'GREG SMITH' },
    { value: 'MICHAEL D HIGGINS', id: 192643, supervisor: 'CLINTON LUND' },
    { value: 'MICHAEL MARTELL', id: 164440, supervisor: 'JACOB ROMERO' },
    { value: 'MICHAEL WESTWOOD', id: 169545, supervisor: 'WILLIAM MORELL' },
    { value: 'MIKE ALEXANDER', id: 203023, supervisor: 'TERRY BANKS' },
    { value: 'MIKE ARNOLD', id: 165172, supervisor: 'ROBERT CID' },
    { value: 'MIKE BLANKENSHIP', id: 174810, supervisor: 'DAVID TRAHAN' },
    { value: 'MISTY DALTON', id: 197556, supervisor: 'BRIAN HAMBLIN' },
    { value: 'MITCHELL CARVER', id: 150674, supervisor: 'DANIEL HAYS' },
    { value: 'MULIAINGA LATU', id: 114306, supervisor: 'ROBERT CID' },
    { value: 'NATHAN FULUVAKA', id: 203961, supervisor: 'BLAKE BEESLEY' },
    { value: 'NEIL SMITH', id: 181746, supervisor: 'STEVE WILLIAMSON' },
    { value: 'NICHOLAS PEAY', id: 161042, supervisor: 'ANGELA HENDRIX' },
    { value: 'NICK BUNNELL', id: 193632, supervisor: 'ANGELA HENDRIX' },
    { value: 'NICK WARD', id: 163399, supervisor: 'CATHERINE GUNDERSON' },
    { value: 'NOELIA CASTILLO', id: 182311, supervisor: 'DANIEL SCHUGK' },
    { value: 'NONE', id: 165015, supervisor: 'TRANSITION' },
    { value: 'PAUL DOLGNER', id: 162950, supervisor: 'RICHARD GLEN MORRIS' },
    { value: 'PAUL GRAY', id: 164046, supervisor: 'MICHAEL RENCKERT' },
    { value: 'PEGGY PLATT', id: 189898, supervisor: 'BLAKE BEESLEY' },
    { value: 'PENDING', id: 165015, supervisor: 'JESSICA COOK' },
    { value: 'QUINN STICKNEY', id: 189818, supervisor: 'JAMES ADAMSON' },
    { value: 'RANDY HALL', id: 119459, supervisor: 'ANGELA HENDRIX' },
    { value: 'REID BEAN', id: 105657, supervisor: 'DAVID LOWRY' },
    { value: 'RELEASE/REENTRY', id: 165015, supervisor: 'KATIE BENNETT' },
    { value: 'RICARDO PEDROZA', id: 183009, supervisor: 'ROBERT CID' },
    { value: 'RICHARD CAMPBELL', id: 144103, supervisor: 'ADRIAN EADS' },
    { value: 'RICHARD JENKINS', id: 134108, supervisor: 'RANDI CARTER' },
    { value: 'RICHARD WAGER', id: 196377, supervisor: 'RANDI CARTER' },
    { value: 'RICK COIL', id: 127618, supervisor: 'ELDON HAMELIN' },
    { value: 'RICK MANWILL', id: 113131, supervisor: 'STEVE WILLIAMSON' },
    { value: 'ROBERT GRAHAM', id: 183496, supervisor: 'BLAKE BEESLEY' },
    { value: 'ROBERT T. MAUGHAN', id: 145486, supervisor: 'DARIN VAN LEEUWEN' },
    { value: 'Robert West', id: 102703, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'ROD FULLMER', id: 116540, supervisor: 'DAVID TRAHAN' },
    { value: 'RONALD J BIBEAU', id: 191880, supervisor: 'JOSHUA DRAPER' },
    { value: 'RONNIE RICHEY', id: 173498, supervisor: 'JUSTIN SCHELIN' },
    { value: 'ROSARIO RAMSEY', id: 195092, supervisor: 'JOSLYN PILLING' },
    { value: 'RUBEN CERVANTES', id: 176001, supervisor: 'JOSHUA DRAPER' },
    { value: 'RUPERT JACKSON', id: 132346, supervisor: 'JASON LOERTSCHER' },
    { value: 'RYAN A VINCENT', id: 184538, supervisor: 'JUSTIN SCHELIN' },
    { value: 'RYAN W. STUBBS', id: 160264, supervisor: 'STEVE WILLIAMSON' },
    { value: 'SAM JACKMAN', id: 198670, supervisor: 'BLAKE BEESLEY' },
    { value: 'SAMANTHA KEELE', id: 165308, supervisor: 'NATHAN ELDRIDGE' },
    { value: 'SARAH E FAULKNER', id: 191580, supervisor: 'NATHAN ELDRIDGE' },
    { value: 'SCOTT C. STEPHENS', id: 157873, supervisor: 'KODY FLOYD' },
    { value: 'SETH PETERSON', id: 166503, supervisor: 'BRIAN HAMBLIN' },
    { value: 'SHARALEE BOOTHE', id: 135078, supervisor: 'CATHERINE GUNDERSON' },
    { value: 'SHAWN ALTON', id: 801340, supervisor: 'ALLEN JULIAN' },
    { value: 'SHAWN BEKKEMELLOM', id: 152034, supervisor: 'TRACY SHOCK' },
    { value: 'SHAWN CHURCH', id: 182988, supervisor: 'DANIEL SCHUGK' },
    { value: 'SHAWN COSTON', id: 205445, supervisor: 'ALLEN JULIAN' },
    { value: 'SHAWN FETTERS', id: 153794, supervisor: 'ANGELA HENDRIX' },
    { value: 'SHAWN J HARRIS', id: 105232, supervisor: 'CATHERINE GUNDERSON' },
    { value: 'SHELBY JACKSON', id: 193610, supervisor: 'BROCK FINDLAY' },
    { value: 'SHON G LUNT', id: 101603, supervisor: 'STEVE WILLIAMSON' },
    { value: 'SITH KIM', id: 173024, supervisor: 'MICHAEL RENCKERT' },
    { value: 'SPENCER DRAKE', id: 207793, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'STEPHEN DOROCIAK', id: 191938, supervisor: 'KILEY D WILLIS' },
    { value: 'STEPHEN FRANCIS', id: 159933, supervisor: 'JAMES CAMPOS' },
    { value: 'STEPHEN PRIEST', id: 186654, supervisor: 'KILEY D WILLIS' },
    { value: 'STEVEN OSTLER', id: 155396, supervisor: 'WILLIAM LUKE' },
    { value: 'STEVEN SYKES', id: 193870, supervisor: 'JOSHUA DRAPER' },
    { value: 'STEVEN UNSWORTH', id: 198990, supervisor: 'GREG SMITH' },
    { value: 'TERRY D. LEWIS', id: 104745, supervisor: 'MICHAEL RENCKERT' },
    { value: 'TINA TELA', id: 195106, supervisor: 'ANTHONY BROWN' },
    { value: 'TLEENA CAMPBELL', id: 161763, supervisor: 'JOSHUA DRAPER' },
    { value: 'TODD GRAHAM', id: 183496, supervisor: 'BLAKE BEESLEY' },
    { value: 'TODD HANSEN', id: 152532, supervisor: 'TRACY SHOCK' },
    { value: 'TODD KIRK', id: 146282, supervisor: 'JAMES CLEGG' },
    { value: 'TOLBY POT', id: 167131, supervisor: 'JASON LOERTSCHER' },
    { value: 'TOM KOSMACK', id: 163240, supervisor: 'VIDA BETTS' },
    { value: 'TRENT P CHRISTENSEN', id: 184518, supervisor: 'GREGORY PERRY' },
    { value: 'TRENT WYNN', id: 106070, supervisor: 'ADRIAN EADS' },
    { value: 'TREVOR R JESSUP', id: 192653, supervisor: 'RICK SMITH' },
    { value: 'TRINA WHITEHEAD', id: 211209, supervisor: 'BRIAN HAMBLIN' },
    { value: 'TYLER CONLEY', id: 209919, supervisor: 'LUKE LASSITER' },
    { value: 'TYLER J CANOVA', id: 190321, supervisor: 'KILEY D WILLIS' },
    { value: 'TYLER LLOYD', id: 183824, supervisor: 'TERRY BANKS' },
    { value: 'TYLER RACKHAM', id: 192926, supervisor: 'CLINTON LUND' },
    { value: 'TYSON KOMER', id: 204196, supervisor: 'KIM BELL-HOLDEN' },
    { value: 'TYSON PEPPER', id: 135990, supervisor: 'GREGORY PERRY' },
    { value: 'VIDA BETTS', id: 153592, supervisor: 'WADE ALLINSON' },
    { value: 'WAYNE ROSE', id: 181742, supervisor: 'DANIEL HAYS' },
    { value: 'WAYNE SMITH', id: 208538, supervisor: 'JAMES CLEGG' },
    { value: 'WENDY WARD', id: 113278, supervisor: 'KIRK LAMBERT' },
    { value: 'WESTON MARSHALL', id: 173889, supervisor: 'DAVID LOWRY' },
    { value: 'WILLIAM MORELL', id: 154378, supervisor: 'IRVIN B. HALE' },
    { value: 'WYLENE IKA', id: 120537, supervisor: 'DENISE R FULLERTON' },
    { value: 'ZACH HUTTO', id: 174926, supervisor: 'TERRY BANKS' },
    { value: 'ZACH THOMAS', id: 193779, supervisor: 'CLINTON LUND' },
];

const supervisors = [
    { value: 'ADRIAN EADS' },
    { value: 'ALBERT WHITEHORSE' },
    { value: 'ALLEN JULIAN' },
    { value: 'ANGELA HENDRIX' },
    { value: 'ANNETTE SALGADO' },
    { value: 'ANTHONY BROWN' },
    { value: 'BLAKE BEESLEY' },
    { value: 'BRIAN HAMBLIN' },
    { value: 'CATHERINE GUNDERSON' },
    { value: 'CLINTON LUND' },
    { value: 'DAN AVIS' },
    { value: 'DANIEL BLANCHARD' },
    { value: 'DANIEL HAYS' },
    { value: 'DANIEL SCHUGK' },
    { value: 'DARIN VAN LEEUWEN' },
    { value: 'DAVID LOWRY' },
    { value: 'DAVID TRAHAN' },
    { value: 'DENNIS FRANKLIN' },
    { value: 'DORIAN WOLFE' },
    { value: 'ELDON HAMELIN' },
    { value: 'ERIC PRICE' },
    { value: 'FELICIA LAGARCE' },
    { value: 'GREG SMITH' },
    { value: 'GREGORY PERRY' },
    { value: 'IRVIN B. HALE' },
    { value: 'JAMES ADAMSON' },
    { value: 'JAMES CAMPOS' },
    { value: 'JAMES CLEGG' },
    { value: 'JASON LOERTSCHER' },
    { value: 'JEFF SHARDLOW' },
    { value: 'JOHN CARPENTER' },
    { value: 'JOSHUA DRAPER' },
    { value: 'JOSLYN PILLING' },
    { value: 'KARL KENNINGTON' },
    { value: 'KATIE CARVER' },
    { value: 'KEN KELLER' },
    { value: 'KILEY D WILLIS' },
    { value: 'KIM BELL-HOLDEN' },
    { value: 'KIRK LAMBERT' },
    { value: 'KODY FLOYD' },
    { value: 'LEEANN DUNFORD' },
    { value: 'MARK COLBY' },
    { value: 'MICHAEL ADAM' },
    { value: 'MICHAEL RENCKERT' },
    { value: 'NATHAN ELDRIDGE' },
    { value: 'NATHAN GRIFFITHS' },
    { value: 'PRESTON KAY' },
    { value: 'RANDI CARTER' },
    { value: 'RICHARD GLEN MORRIS' },
    { value: 'RICK SMITH' },
    { value: 'ROBERT CID' },
    { value: 'RYAN PROCTOR' },
    { value: 'SETH ROBINSON' },
    { value: 'SPENCER TURLEY' },
    { value: 'STEVE WILLIAMSON' },
    { value: 'STEVE YEATES' },
    { value: 'TERRY BANKS' },
    { value: 'TONY GARRETT' },
    { value: 'TRACY SHOCK' },
    { value: 'TRANSITION' },
    { value: 'VIDA BETTS' },
    { value: 'WADE ALLINSON' },
    { value: 'WILLIAM LUKE' }
];

const supervisionContactDays = [30, 60, 90, 180];

const counties = [
    'BEAVER',
    'BOX ELDER',
    'CACHE',
    'CARBON',
    'DAGGETT',
    'DAVIS',
    'DUCHESNE',
    'EMERY',
    'GARFIELD',
    'GRAND',
    'IRON',
    'JUAB',
    'KANE',
    'MILLARD',
    'MORGAN',
    'PIUTE',
    'RICH',
    'SALT LAKE',
    'SAN JUAN',
    'SANPETE',
    'SEVIER',
    'SUMMIT',
    'TOOELE',
    'UINTAH',
    'UTAH',
    'WASATCH',
    'WASHINGTON',
    'WAYNE',
    'WEBER',
];

export {
  supervisionItems,
  mainGangs,
  offenseTypes,
  agents,
  supervisors,
  supervisionContactDays,
  counties
};
