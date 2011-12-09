#!/usr/bin/perl
use strict;
use warnings;
use utf8;
use 5.010000;
use autodie;

BEGIN { $Unicode::EastAsianWidth::EastAsian = 1 }
use Unicode::EastAsianWidth;
BEGIN { $Unicode::EastAsianWidth::EastAsian = 1 }

xxx(InFullwidth());
# xxx(InHalfwidth());

sub xxx {
    my $pattern = shift;

    print "[";
    for my $line (split /\n/, $pattern) {
        my ($beg, $end) = split /\t/, $line;
        next if length($beg) >= 5;
        if ($beg eq $end) {
            print "\\u$beg";
        } else {
            print "\\u$beg-\\u$end";
        }
    }

    print "]\n";
}

