function bind_payout_window(element, settlement_type, pay_table, entries_per_user)
    {
    element.onclick = (function(settlement_type, raw_pay_table, entries_per_user)
        {
        return function()
            {
            var payout_info = "Payout info<br/><br/>";
            payout_info += "<div style=\"font-size:14px;text-align:left!important\">";
            switch (settlement_type)
                {
                case "HEADS-UP" :
                    payout_info += "This is a heads-up pool. The winning entry will double up.";
                    break;
                case "DOUBLE-UP" :
                    payout_info += "This is a double-up pool. The top half of entries will double up.";
                    break;
                case "JACKPOT" :
                    payout_info += "This is a jackpot pool with the following pay table:";
                    payout_info += "<br/>";
                    payout_info += "<br/>";
                    payout_info += "<table class=\"pay_table\">";

                    pay_table = JSON.parse(raw_pay_table);

                    for (var i=0; i<pay_table.length; i++)
                        {
                        var pay_table_item = pay_table[i],

                        rank = pay_table_item.rank,
                        payout = pay_table_item.payout;

                        payout_info += "<tr><td>" + rank + "<sup>" + get_ordinal_suffix(rank) + "</sup>" + "</td><td>" + payout * 100 + "%</td></tr>";
                        }

                    payout_info += "</table>";
                    payout_info += "</div>";
                    break;
                }
            show_simple_modal(payout_info, "good", null);
            }
        })(settlement_type, pay_table, entries_per_user);
    }