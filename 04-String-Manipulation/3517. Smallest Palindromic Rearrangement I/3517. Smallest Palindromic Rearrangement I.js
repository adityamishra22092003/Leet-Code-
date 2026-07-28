    int n=s.length();
    int[] freq=new int[26];
    for(char ch:s.toCharArray())
    {
        freq[ch-'a']++;
    }

    char[] small=new char[n];
    int j=0,k=n-1;

    for(int i=0;i<26;i++)
    {
        while(freq[i]>0)
        {
            char ch=(char)('a'+i);
            if(freq[i]%2==0)
            {
                small[j++]=ch;
                small[k--]=ch;
                freq[i]-=2;
            }
            else
            {
                small[n/2]=ch;
                freq[i]--;
            }
        }
    }
    return new String(small);
}