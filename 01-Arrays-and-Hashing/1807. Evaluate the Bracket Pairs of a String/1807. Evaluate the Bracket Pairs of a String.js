class Solution {
public:
    string evaluate(string& s, vector<vector<string>>& knowledge) {
        const int n=s.size(), m=knowledge.size();
        unordered_map<string_view, string> mp;
        mp.reserve(n);
        for(auto&& kv : knowledge)
            mp[kv[0]]=kv[1];
        string t;
        t.reserve(n);
        for(int i=0; i<n; i++){
            while(i<n && s[i]>='a')
                t+=s[i++];
            if (i==n) break;

            if (s[i]=='('){
                int l=i++, r;
                while(i<n && s[i]>='a') i++;
                if (s[i]==')') r=i;
                string key=s.substr(l+1, r-l-1);
                if (auto it=mp.find(key); it!=mp.end())
                    t+=it->second;
                else t+='?';
            }
        }
        return t;
    }
};